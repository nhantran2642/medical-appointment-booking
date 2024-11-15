from authentication.serializers import RegisterSerializer, UserSerializer
from doctor.models import Doctor
from rest_framework import serializers


class DoctorSerializer(serializers.ModelSerializer):
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


class DoctorUpdateSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = ["user", "description", "price", "active", "specialty", "department"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if user_data:
            user_serializer = self.fields["user"]
            user_serializer.update(instance.user, user_data)

        instance.save()
        return instance
