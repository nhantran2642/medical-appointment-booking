from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from api import constants
from department.models import Department
from department.serializers import DepartmentSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permission import IsAdminUser



class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer

    def get_permissions(self):
        if self.action in ["create", "list", "destroy", ]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action in ["update"]:
            return DepartmentSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        return Department.objects.all()





    
