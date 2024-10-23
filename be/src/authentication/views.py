import json
from base64 import urlsafe_b64decode, urlsafe_b64encode
from datetime import datetime, timedelta

from api import constants, settings
from authentication.service import gen_verify_code
from django.utils import timezone
from rest_framework import generics, status, views, viewsets
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response
from utilities.email.mailer import send_verify_email, send_verify_login
from utilities.permission import IsAuthenticated

from .models import User
from .serializers import (
    ChangePasswordSerializer,
    LoginSerializer,
    LogoutSerializer,
    RegisterSerializer,
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
        # api = (
        #     f"{settings.API_URL}/api/{settings.VERSION}/auth/verify/?p={email_encode}/"
        # )

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

        if not user.last_login or user.last_login > timezone.now() + timedelta(
            days=settings.TWO_FA_EXPIRE
        ):
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
        return Response(serializer.data, status=status.HTTP_200_OK)
