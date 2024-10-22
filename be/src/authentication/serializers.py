from datetime import timedelta

from api import constants, settings
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError

from .models import Role, User, UserVerifyCode


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
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
        role_id = attrs.get("role_id", None)
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
        if current_time > attrs.get("expired_at", None):
            raise NotFound("Mail is outdated")

        try:
            user = User.objects.get(email=attrs.get("email", None))
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
        code = attrs.get("code", None)
        email = attrs.get("email", None)

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
        user.last_login = timezone.now() + timedelta(days=settings.TWO_FA_EXPIRE)
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
        email = attrs.get("email", "")
        password = attrs.get("password", "")

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
