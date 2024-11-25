from authentication.models import User
from django.db import models
from doctor.models import Doctor
from utilities.base import BaseModel


class AppointmentStatus(models.TextChoices):
    SCHEDULED = "Scheduled", "Scheduled"
    COMPLETED = "Completed", "Completed"
    CANCELLED = "Cancelled", "Cancelled"


class Appointment(BaseModel):
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(
        User, related_name="appointments", on_delete=models.DO_NOTHING, null=True
    )
    doctor = models.ForeignKey(
        Doctor, to_field="id", related_name="appointments", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-id"]
        db_table = "appointment"
