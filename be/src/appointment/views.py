from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer, AppointmentDetailSerializer
from doctor.models import Doctor
from payment.utils import generate_vnpay_payment_url
from rest_framework import status, viewsets
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from utilities.permission import *


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer

    def get_permissions(self):
        if self.action in ["create", "destroy"]:
            return [IsUser()]
        return []

    def get_serializer_class(self):
        if self.action in ["create", "retrieve"]:
            return AppointmentSerializer
        if self.action == "list":
            return AppointmentDetailSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        user_id = self.request.user_id
        role_id = self.request.role_id
        if not role_id or not user_id:
            raise PermissionDenied("Missing role_id or user_id in request.")

        if role_id == constants.USER_ROLE["DOCTOR"]:
            try:
                doctor = Doctor.objects.get(user_id=user_id)
                doctor_id = doctor.id
            except Doctor.DoesNotExist:
                raise NotFound("Doctor not found")
            queryset = Appointment.objects.filter(doctor_id=doctor_id)
        elif role_id == constants.USER_ROLE["USER"]:
            queryset = Appointment.objects.filter(user_id=user_id)
        elif role_id == constants.USER_ROLE["ADMIN"] or role_id == constants.USER_ROLE["STAFF"]:
            queryset = Appointment.objects.all()
        else:
            raise PermissionDenied("Invalid role_id.")

        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(
            data=data, context={"user_id": request.user_id}
        )
        serializer.is_valid(raise_exception=True)

        user_id = request.user_id
        doctor_id = serializer.validated_data["doctor_id"]
        doctor = Doctor.objects.get(pk=doctor_id)
        price = int(doctor.price)
        order_desc = f"Thanh toán cuộc hẹn cho bác sĩ {doctor.user.get_full_name()}"

        payment_url = generate_vnpay_payment_url(
            request,
            user_id=user_id,
            amount=price,
            doctor_id=doctor_id,
            appointment_datetime=data.get("appointment_date"),
            order_desc=order_desc,
        )

        return Response({"payment_url": payment_url}, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
