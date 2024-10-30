from django.db import models
from doctor.models import Doctor
from patient.models import Patient
from utilities.base import BaseModel


class Appointment(BaseModel):
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=255)
    patient = models.ForeignKey(Patient, to_field="id", on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, to_field="id", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-id"]
        db_table = "appointment"
