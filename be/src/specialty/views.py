from rest_framework import viewsets, status
from rest_framework.response import Response

from specialty.models import Specialty
from specialty.serializers import SpecialtySerializer
from utilities.permission import *


class SpecialtyViewSet(viewsets.ModelViewSet):
    serializer_class = SpecialtySerializer

    def get_permission(self):
        if self.action in ["create", "update", "destroy"]:
            return [IsAdmin()]
        return []

    def get_queryset(self):
        return Specialty.objects.all()
