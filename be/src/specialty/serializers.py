from rest_framework import serializers

from specialty.models import Specialty


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ["id", "name", "description", "department"]