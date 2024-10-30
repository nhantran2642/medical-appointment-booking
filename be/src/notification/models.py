from appointment.models import Appointment
from django.db import models
from patient.models import Patient
from utilities.base import BaseModel


class Notification(BaseModel):
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    appointment = models.ForeignKey(
        Appointment, to_field="id", on_delete=models.CASCADE
    )
    patient = models.ForeignKey(Patient, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "notification"
