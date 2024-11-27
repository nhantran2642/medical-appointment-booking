from django.contrib import admin

from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = [
        "user_pk", 
        "user_email", 
        "user_phone", 
        "user_first_name", 
        "user_last_name", 
        "active", 
        "specialty", 
        "department"
    ]
    search_fields = []

    def user_pk(self, obj):
        return obj.user.pk

    def user_email(self, obj):
        return obj.user.email

    def user_phone(self, obj):
        return obj.user.phone

    def user_first_name(self, obj):
        return obj.user.first_name

    def user_last_name(self, obj):
        return obj.user.last_name

    def specialty(self, obj):
        return obj.specialty.name if obj.specialty else None

    def department(self, obj):
        return obj.department.name if obj.department else None

