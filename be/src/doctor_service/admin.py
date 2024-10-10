from django.contrib import admin

from .models import DoctorService


@admin.register(DoctorService)
class DoctorServiceAdmin(admin.ModelAdmin):
    list_display = []
    search_fields = []
