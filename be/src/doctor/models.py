from django.db import models
from utilities.base import BaseModel
from authentication.models import User


class Doctor(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)
    # department = models.ForeignKey(Department, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        db_table = "doctor"
