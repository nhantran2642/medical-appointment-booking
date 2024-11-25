from django.urls import  include
from rest_framework.routers import SimpleRouter
from department.views import DepartmentViewSet
from django.urls import re_path as url
router = SimpleRouter()
router.register(r'', DepartmentViewSet, basename='department')

urlpatterns = [
    url(r'^', include(router.urls)),

]

app_name="department"
