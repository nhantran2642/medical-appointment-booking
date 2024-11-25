from rest_framework.exceptions import ValidationError, NotFound

from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response

from doctor.models import Doctor
from payment.utils import generate_vnpay_payment_url
from utilities.permission import IsUser, IsDoctorUser
import datetime


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer

    def get_permissions(self):
        if self.action in ["create", "list", "destroy"]:
            self.permission_classes = [IsUser]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return AppointmentSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        queryset = Appointment.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data, context={"user_id": request.user_id})
        serializer.is_valid(raise_exception=True)

        user_id = request.user_id
        doctor_id = serializer.validated_data["doctor_id"]
        doctor = Doctor.objects.get(pk=doctor_id)
        price = int(doctor.price)
        order_desc = f"Thanh toán cuộc hẹn cho bác sĩ {doctor.user.get_full_name()}"

        payment_url = generate_vnpay_payment_url(request, user_id=user_id, amount=price, doctor_id=doctor_id, appointment_datetime=data.get("appointment_date"), order_desc=order_desc)

        return Response({'payment_url': payment_url}, status=status.HTTP_200_OK)

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
