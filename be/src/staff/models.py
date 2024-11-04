from authentication.models import User
from department.models import Department
from django.db import models
from utilities.base import BaseModel


class Staff(BaseModel):
    user = models.ForeignKey(User, to_field="id", on_delete=models.CASCADE)
    department = models.ForeignKey(Department, to_field="id", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        db_table = "staff"
