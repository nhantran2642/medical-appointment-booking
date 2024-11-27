from department.models import Department
from django.db import models
from utilities.base import BaseModel


class Specialty(BaseModel):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, null=True, blank=True)
    department = models.ForeignKey(Department, to_field="id", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "specialty"
