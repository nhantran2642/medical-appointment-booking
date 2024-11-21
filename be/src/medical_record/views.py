from rest_framework import viewsets, status
from rest_framework.response import Response
from medical_record.models import MedicalRecord
from medical_record.serializers import MedicalRecordSerializer
from utilities.permission import IsDoctorUser


class MedicalRecordViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalRecordSerializer
    permission_classes = [IsDoctorUser]

    def get_permissions(self):
        if self.action in ["create", "update"]:
            self.permission_classes = [IsDoctorUser]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return MedicalRecordSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        queryset = MedicalRecord.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
