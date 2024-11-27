from django.db import models
from doctor.models import Doctor
from utilities.base import BaseModel


class TimeSlot(BaseModel):
    start_time = models.TimeField()
    end_time = models.TimeField()
    doctors = models.ManyToManyField(Doctor)

    class Meta:
        db_table = "time_slot"
