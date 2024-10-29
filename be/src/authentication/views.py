import json
from base64 import urlsafe_b64decode, urlsafe_b64encode
from datetime import datetime, timedelta

from api import constants, settings
from api.constants import USER_ROLE
from authentication.service import gen_verify_code
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponseRedirect
from django.utils import timezone
from django.utils.encoding import smart_bytes, smart_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, status, views, viewsets
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response
from rest_framework.reverse import reverse
from utilities.email.mailer import (
    send_password_reset_email,
    send_verify_email,
    send_verify_login,
)
from utilities.permission import IsAuthenticated
from yaml import serialize

from .models import User
from .serializers import (
    ChangePasswordSerializer,
    LoginSerializer,
    LogoutSerializer,
    RegisterSerializer,
    ResetPasswordRequestSerializer,
    SetNewPasswordSerializer,
    UserSerializer,
    VerifyCodeSerializer,
    VerifyEmailSerializer,
)

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self, *args, **kwargs):
        if self.action == "create":
            return RegisterSerializer
        if self.action in ["update", "retrieve"]:
            return UserSerializer
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        return super().get_queryset()

    def list(self, request, *args, **kwargs):
        pass

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data, context={"user": request.user})
        serializer.is_valid(raise_exception=True)
        return Response(serializer, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        pass


class RegisterUserView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        request_data = request.data
        serializer = self.serializer_class(data=request_data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        user_data = serializer.data

        user_data["id"] = user.id
        data = {
            "email": user.email,
            "expired_at": (
                datetime.now() + timedelta(minutes=settings.MAIL_EXPIRE)
            ).strftime(constants.FULL_DAY_FORMAT),
        }
        json_str = json.dumps(data)
        email_encode = urlsafe_b64encode(json_str.encode()).decode("utf-8")

        url = f"{settings.WEBSITE_URL}?p={email_encode}"

        send_verify_email(user, url)
        return Response(
            {"user": user_data, "code": email_encode}, status=status.HTTP_201_CREATED
        )


class VerifyEmailView(generics.GenericAPIView):
    serializer_class = VerifyEmailSerializer

    def post(self, request, *args, **kwargs):
        params = request.query_params
        if (encoded_data := params.get("p", None)) is None:
            raise NotFound("Parameter 'p' is missing.")

        try:
            decoded_data = urlsafe_b64decode(encoded_data).decode("utf-8")
            data = json.loads(decoded_data)
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True)
        except (ValueError, json.JSONDecodeError):
            raise NotFound("Invalid data provided.")

        return Response({"message": "User is activated"}, status=status.HTTP_200_OK)


class LoginAPIView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(email=request.data["email"])
        except User.DoesNotExist:
            raise NotFound("Invalid email")

        if (
            not user.last_login
            or user.last_login > timezone.now() + timedelta(days=settings.TWO_FA_EXPIRE)
        ) and user.role == USER_ROLE["USER"]:
            verify_code = gen_verify_code(user)

            send_verify_login(user, verify_code)

            return Response(
                {
                    "is_send_code": True,
                    "message": "Send code verify for mail success",
                },
                status=status.HTTP_200_OK,
            )
        else:
            refresh = user.tokens()
            return Response(
                {"is_send_code": False, "message": "Login successful", **refresh},
                status=status.HTTP_200_OK,
            )


class VerifyCodeAPIView(views.APIView):
    serializer_class = VerifyCodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutAPIView(views.APIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ResendCodeAPIView(views.APIView):

    def post(self, request, *args, **kwargs):
        if not request.data.get("email", None):
            raise ValidationError("Please enter email.")
        try:
            user = User.objects.get(email=request.data["email"])
        except User.DoesNotExist:
            raise NotFound("Invalid email")

        verify_code = gen_verify_code(user)

        send_verify_login(user, verify_code)
        return Response(
            {
                "is_send_code": True,
                "message": "Send code verify for mail success",
            },
            status=status.HTTP_200_OK,
        )


class ChangePasswordAPIView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permissions_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message: Change password succesfully"}, status=status.HTTP_200_OK
        )


class ResetPasswordAPIView(views.APIView):
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.get(email=request.data["email"])

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))

        current_site = get_current_site(request=request).domain
        relative_link = reverse(
            "password-reset-confirm",
            kwargs={"uidb64": uidb64, "token": token},
        )
        send_password_reset_email(user, current_site, relative_link)

        return Response(
            {"message": "We have sent you a link to reset your password"},
            status=status.HTTP_200_OK,
        )


class PasswordTokenCheckAPI(views.APIView):

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            id_auto_gen = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id_auto_gen)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return HttpResponseRedirect(
                    settings.WEBSITE_URL + "/password-reset?token_valid=False"
                )
            return HttpResponseRedirect(
                settings.WEBSITE_URL
                + "/password-reset?token_valid=True&message=Credentials Valid&uidb64="
                + uidb64
                + "&token="
                + token
            )
        except Exception as e:
            print(e)
            return HttpResponseRedirect(settings.WEBSITE_URL + "?token_valid=False")


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Password reset success"},
            status=status.HTTP_200_OK,
        )
