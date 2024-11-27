from medical_record.models import MedicalRecord
from medical_record.serializers import (
    MedicalRecordSerializer,
    MedicalRecordUpdateSerializer,
)
from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permission import IsAdminUser, IsDoctor


class MedicalRecordViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalRecordSerializer

    def get_permissions(self):
        if self.action == "destroy":
            return [IsAdminUser]
        return []

    def get_serializer_class(self):
        if self.action in ["create", "list"]:
            return MedicalRecordSerializer
        if self.action == "update":
            return MedicalRecordUpdateSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        queryset = MedicalRecord.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"user_id": request.user_id}
        )
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
