from django.urls import include, path, re_path
from medical_record.views import MedicalRecordViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"", MedicalRecordViewSet, "medical-record")
urlpatterns = [
    re_path(r"^", include(router.urls)),
]
