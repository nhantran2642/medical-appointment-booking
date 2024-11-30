from authentication.serializers import UserSerializer
from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from datetime import timezone, timedelta
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.IntegerField()

    class Meta:
        model = Appointment
        fields = ("id", "appointment_date", "status", "doctor_id")

    def create(self, validated_data):
        user_id = self.context["user_id"]
        try:
            doctor_id = validated_data.pop("doctor_id")
            doctor = Doctor.objects.get(pk=doctor_id)
        except Exception as ex:
            raise NotFound("Doctor does not exist.")
        instance = Appointment.objects.create(
            **validated_data, user_id=user_id, doctor=doctor
        )
        return instance


class AppointmentDetailSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = "__all__"
