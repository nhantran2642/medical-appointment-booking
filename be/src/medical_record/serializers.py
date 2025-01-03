from authentication.models import User
from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from medical_record.models import MedicalRecord
from rest_framework import serializers
from rest_framework.exceptions import NotFound


class MedicalRecordSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = MedicalRecord
        fields = [
            "id",
            "diagnosis",
            "treatment",
            "prescription",
            "start_date",
            "end_date",
            "notes",
            "user_id",
            "doctor",
        ]

    def create(self, validated_data):

        # Retrieve current doctor from the context
        try:
            user_id = self.context.get("user_id", None)
            doctor = Doctor.objects.get(user_id=user_id)
        except Doctor.DoesNotExist:
            raise NotFound("Doctor does not exist.")

        # Retrieve and validate the user ID
        try:
            user_id = validated_data.pop("user_id")
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound("Patient/User does not exist.")
        except KeyError:
            raise serializers.ValidationError({"user_id": "User ID is required."})

        # Create the Medical Record instance
        medical_record = MedicalRecord.objects.create(
            **validated_data, user=user, doctor=doctor
        )

        return medical_record


class MedicalRecordUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = [
            "diagnosis",
            "treatment",
            "prescription",
            "start_date",
            "end_date",
            "notes",
        ]

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
