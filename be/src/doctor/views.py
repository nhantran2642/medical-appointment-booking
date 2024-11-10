from rest_framework import status, viewsets
from rest_framework.response import Response

from .serializers import DoctorSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return DoctorSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
