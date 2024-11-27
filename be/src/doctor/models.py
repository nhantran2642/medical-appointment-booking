from authentication.models import User
from department.models import Department
from django.db import models
from specialty.models import Specialty
from utilities.base import BaseModel


class Doctor(BaseModel):
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)
    user = models.OneToOneField(
        User, to_field="id", related_name="doctor", on_delete=models.CASCADE
    )
    specialty = models.ForeignKey(
        Specialty,
        to_field="id",
        related_name="doctor",
        on_delete=models.CASCADE,
        null=True,
    )
    department = models.ForeignKey(
        Department,
        to_field="id",
        related_name="doctor",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        ordering = ["-id"]
        db_table = "doctor"
