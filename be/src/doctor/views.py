from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permission import IsAdminUser

from .models import Doctor
from .serializers import DoctorSerializer, DoctorUpdateSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer

    def get_permissions(self):
        if self.action == "list":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return DoctorSerializer
        if self.action in ["update", "list"]:
            return DoctorUpdateSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        return Doctor.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
