from django.contrib import admin

from .models import AppointmentRecord


@admin.register(AppointmentRecord)
class AppointmentRecordAdmin(admin.ModelAdmin):
    list_display = []
    search_fields = []
