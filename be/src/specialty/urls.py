from django.urls import include, path, re_path
from specialty.views import SpecialtyViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"", SpecialtyViewSet, "specialty")
urlpatterns = [
    re_path(r"^", include(router.urls)),
]
