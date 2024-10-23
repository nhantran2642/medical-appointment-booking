from django.urls import include, path
from django.urls import re_path as url
from django.views.generic import RedirectView
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ChangePasswordAPIView,
    LoginAPIView,
    LogoutAPIView,
    RegisterUserView,
    ResendCodeAPIView,
    ResetPasswordAPIView,
    UserViewSet,
    VerifyCodeAPIView,
    VerifyEmailView,
)

router = SimpleRouter()
# router.register(r"", UserViewSet, "auth")

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify_email/", VerifyEmailView.as_view(), name="verify_email"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("login/verify_code", VerifyCodeAPIView.as_view(), name="verify_code"),
    path("login/resend_code", ResendCodeAPIView.as_view(), name="resend_code"),
    path("change_password/", ChangePasswordAPIView.as_view(), name="resend_code"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("reset_password/", ResetPasswordAPIView.as_view(), name="logout"),
]
