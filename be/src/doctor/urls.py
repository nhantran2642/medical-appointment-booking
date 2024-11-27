from django.urls import include, path, re_path
from doctor.views import DoctorViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"", DoctorViewSet, "doctor")
urlpatterns = [
    re_path(r"^", include(router.urls)),
]
