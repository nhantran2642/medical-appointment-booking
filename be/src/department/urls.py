from django.urls import include, path, re_path
from department.views import DepartmentViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"", DepartmentViewSet, "department")
urlpatterns = [
    re_path(r"^", include(router.urls)),
]
