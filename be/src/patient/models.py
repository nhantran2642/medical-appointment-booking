from authentication.models import User
from django.db import models
from utilities.base import BaseModel


class Patient(BaseModel):
    gender = models.IntegerField(null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    insurance_info = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(User, to_field="id", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        ordering = ["-id"]
        db_table = "patient"
