from django.contrib import admin

from .models import Treatment


@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = []
    search_fields = []
