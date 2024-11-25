from doctor.models import Doctor
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from datetime import timezone, timedelta
from department.models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name"]

       
