from authentication.models import User
from authentication.serializers import RegisterSerializer, UserSerializer
from django.core.exceptions import BadRequest

from department.serializers import DepartmentSerializer
from doctor.models import Doctor
from rest_framework import serializers
from specialty.serializers import SpecialtySerializer


class DoctorRegisterSerializer(serializers.ModelSerializer):
    user = RegisterSerializer()

    class Meta:
        model = Doctor
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_serializer = RegisterSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        doctor = Doctor.objects.create(user=user, **validated_data)

        return doctor


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    specialty = SpecialtySerializer()
    department = DepartmentSerializer()

    class Meta:
        model = Doctor
        fields = [
            "id",
            "user",
            "description",
            "price",
            "active",
            "specialty",
            "department",
        ]

    def update(self, instance, validated_data):
        try:
            # update user
            user_data = validated_data.pop("user")
            User.objects.filter(pk=instance.user_id).update(**user_data)

            # update doctor
            for key, value in validated_data.items():
                setattr(instance, key, value)
            instance.save()

            return instance
        except:
            return BadRequest("Data user and doctor are not valid")
