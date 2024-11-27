from appointment.models import Appointment
from authentication.models import User
from django.db import models
from utilities.base import BaseModel


class Notification(BaseModel):
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    appointment = models.ForeignKey(
        Appointment, to_field="id", on_delete=models.CASCADE
    )
    user = models.ForeignKey(User, to_field="id", on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = "notification"
