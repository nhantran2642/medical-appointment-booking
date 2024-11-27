from django.db import models
from utilities.base import BaseModel, CustomModel


class Department(BaseModel, CustomModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "department"
