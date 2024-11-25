from authentication.models import User
from django.db import models
from doctor.models import Doctor
from utilities.base import BaseModel


class MedicalRecord(BaseModel):
    user = models.ForeignKey(User, to_field="id", on_delete=models.CASCADE, null=True)
    doctor = models.ForeignKey(Doctor, to_field="id", on_delete=models.CASCADE)
    diagnosis = models.TextField(null=True, blank=True)
    treatment = models.TextField(null=True, blank=True)
    prescription = models.TextField(null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    notes = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "medical_record"
