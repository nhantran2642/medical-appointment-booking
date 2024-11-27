from rest_framework import serializers

from department.models import Department
from department.serializers import DepartmentSerializer
from specialty.models import Specialty


class SpecialtySerializer(serializers.ModelSerializer):

    class Meta:
        model = Specialty
        fields = [
            "id",
            "name",
            "description",
            "department"
        ]
