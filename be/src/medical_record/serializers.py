from rest_framework import serializers
from rest_framework.exceptions import NotFound
from authentication.models import User
from medical_record.models import MedicalRecord


class MedicalRecordSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = MedicalRecord
        fields = [
            "diagnosis",
            "treatment",
            "prescription",
            "start_date",
            "end_date",
            "notes",
            "user_id",
        ]

    def create(self, validated_data):

        # Retrieve current doctor from the context
        doctor = self.context.get("doctor")
        if not doctor:
            raise serializers.ValidationError({"doctor": "Doctor context is required."})

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
            **validated_data,
            user=user,
            doctor=doctor
        )

        return medical_record
