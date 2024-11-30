from authentication.serializers import UserSerializer
from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from rest_framework import serializers
from rest_framework.exceptions import NotFound
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
    # user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    # patient_first_name = serializers.CharField(source="user.first_name", read_only=True)
    # patient_last_name = serializers.CharField(source="user.last_name", read_only=True)
    doctor_id = serializers.IntegerField(source="doctor.id", read_only=True)
    # doctor_first_name = serializers.CharField(source="doctor.user.first_name", read_only=True)
    # doctor_last_name = serializers.CharField(source="doctor.user.last_name", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "appointment_date",
            "status",
            "updated_at",
            "user_id",
            # "patient_first_name",
            # "patient_last_name",
            "doctor_id",
            # "doctor_first_name",
            # "doctor_last_name",
        ]
