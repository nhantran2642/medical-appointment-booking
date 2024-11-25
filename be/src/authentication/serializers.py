from api import constants, settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.validators import validate_email
from django.utils import timezone
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from utilities.validate import validate_password

from .models import Role, User, UserVerifyCode


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "address",
            "phone",
        )


class ListUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)

    class Meta:
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    role_id = serializers.IntegerField(required=True)

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "address",
            "phone",
            "role_id",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate(self, attrs):
        role_id = attrs["role_id"]
        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            raise serializers.ValidationError(
                {"role": "Role with this ID does not exist."}
            )
        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user


class VerifyEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3, write_only=True)
    expired_at = serializers.DateTimeField(
        write_only=True, input_formats=[constants.FULL_DAY_FORMAT]
    )

    class Meta:
        model = User
        fields = ["email", "expired_at"]

    def validate(self, attrs):

        current_time = timezone.now()
        if current_time > attrs["expired_at"]:
            raise NotFound("Mail is outdated")

        try:
            user = User.objects.get(email=attrs["email"])
            user.is_verified = True
            user.save()
        except User.DoesNotExist:
            raise NotFound("User does not exist.")

        return super().validate(attrs)


class VerifyCodeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    code = serializers.CharField(write_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)
    access = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = UserVerifyCode
        fields = ["code", "email", "refresh", "access"]

    def validate(self, attrs):
        code = attrs["code"]
        email = attrs["email"]

        try:
            user = User.objects.get(email=email)
        except:
            raise NotFound("User does not exist.")
        try:
            user_verify_code = UserVerifyCode.objects.get(user_id=user.id)
        except:
            raise NotFound("Code is outdated")

        if user_verify_code.verify_time > settings.LOGIN_TIME:
            user_verify_code.delete()
            raise NotFound("Enter wrong too many times")
        if user_verify_code.code != code:
            user_verify_code.verify_time += 1
            user_verify_code.save()
            raise NotFound("Code is not valid.")
        if user_verify_code.expired_at < timezone.now():
            raise NotFound("Code is outdated")

        UserVerifyCode.objects.filter(user_id=user.id).delete()
        user.last_login = timezone.now()
        user.save()
        refresh = user.tokens()
        return {"email": user.email, **refresh}


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["email", "password"]

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid credentials, try again")

        if not user.check_password(password):
            raise AuthenticationFailed("Invalid credentials, try again")

        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")

        return super().validate(attrs)


class UserVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVerifyCode
        fields = ["code", "user", "expired_at"]

    def create(self, validated_data):
        UserVerifyCode.objects.filter(user_id=int(validated_data["user"].id)).delete()
        user_verify_user = UserVerifyCode.objects.create(**validated_data)

        return user_verify_user


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {"message": "Token is expired or invalid"}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            RefreshToken(self.token).blacklist()
        except TokenError:
            pass


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise ValidationError(
                "Your old password was entered incorrectly. Please enter it again."
            )
        return value

    def validate(self, attrs):
        new_password = attrs["new_password"]
        confirm_password = attrs["confirm_password"]
        if new_password != confirm_password:
            raise ValidationError("New password and confirmation password do not match")

        validate_password(new_password)
        return super().validate(attrs)

    def save(self, **kwargs):
        password = self.validated_data["new_password"]
        user = self.context["request"].user
        user.set_password(password)
        user.save()
        return user


class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        try:
            validate_email(email)
            if not User.objects.filter(email=email).exists():
                raise ValidationError("Email is not exist.")
        except ValidationError:
            raise ValidationError("Invalid email")
        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            id_auto_gen = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id_auto_gen)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            validate_password(password)
            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise e
