from django.urls import include, path
from django.urls import re_path as url
from rest_framework.routers import SimpleRouter

from .views import (
    LoginAPIView,
    RegisterUserView,
    UserViewSet,
    VerifyCodeAPIView,
    VerifyEmailView,
)

router = SimpleRouter()
router.register(r"", UserViewSet, "auth")

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify/", VerifyEmailView.as_view(), name="verify"),
    path("login/", LoginAPIView.as_view(), name="verify"),
    path("login/verify_code", VerifyCodeAPIView.as_view(), name="verify"),
    # url(r"^", include(router.urls)),
]
