from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter

from .views import UserViewSet


router = SimpleRouter()
router.register(r"", UserViewSet, "users")

urlpatterns = [
    re_path(r"^", include(router.urls)),
]
