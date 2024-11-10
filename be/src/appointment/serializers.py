from doctor.models import Doctor
from rest_framework import serializers
from rest_framework.exceptions import NotFound

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.IntegerField()

    class Meta:
        model = Appointment
        fields = ("appointment_date", "status", "doctor_id")

    def create(self, validated_data):
        user = self.context["user"]
        try:
            doctor_id = validated_data.pop("doctor_id")
            doctor = Doctor.objects.get(pk=doctor_id)
        except Exception as ex:
            raise NotFound("Doctor does not exist.")
        instance = Appointment.objects.create(
            **validated_data, user=user, doctor=doctor
        )
        return instance
