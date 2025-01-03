from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permission import *

from .models import Doctor
from .serializers import DoctorRegisterSerializer, DoctorSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer

    def get_permissions(self):
        if self.action in ["create", "destroy"]:
            return [IsAdmin()]
        if self.action == "update":
            return [IsAdminDoctor()]
        return []

    def get_serializer_class(self):
        if self.action == "create":
            return DoctorRegisterSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        return Doctor.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serialize = self.get_serializer(page, many=True)
            return self.get_paginated_response(serialize.data)
        return Response(
            self.get_serializer(
                queryset,
                many=True,
            ).data,
            status=status.HTTP_200_OK,
        )

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

    @action(detail=False, methods=["get"])
    def get_doctor_id(self, request):
        user_id = request.query_params.get("user_id")
        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            return Response({"doctor_id": doctor.id}, status=status.HTTP_200_OK)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)
