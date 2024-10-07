from rest_framework.routers import SimpleRouter

from django.urls import include
from django.urls import re_path as url

from .views import AppointmentViewSet

router = SimpleRouter()
router.register(r"", AppointmentViewSet, "appointment")

app_name = "appointment"
urlpatterns = [url(r"^", include(router.urls))]
