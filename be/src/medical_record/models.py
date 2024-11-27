from django.db import models
from doctor.models import Doctor
from authentication.models import User
from utilities.base import BaseModel


class MedicalRecord(BaseModel):
    diagnosis = models.TextField(null=True, blank=True)
    treatment = models.TextField(null=True, blank=True)
    prescription = models.TextField(null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    notes = models.TextField(null=True, blank=True)
    user = models.ForeignKey(
        User,
        to_field="id",
        related_name="medical_record",
        on_delete=models.CASCADE,
        null=True
    )
    doctor = models.ForeignKey(
        Doctor,
        to_field="id",
        related_name="medical_record",
        on_delete=models.CASCADE,
        null=True
    )

    class Meta:
        db_table = "medical_record"
