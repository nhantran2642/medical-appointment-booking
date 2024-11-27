from rest_framework import viewsets

from department.models import Department
from department.serializers import DepartmentSerializer
from utilities.permission import *


class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer

    def get_permission(self):
        if self.action in ["create", "update", "destroy"]:
            return [IsAdmin()]
        return []

    def get_queryset(self):
        return Department.objects.all()
