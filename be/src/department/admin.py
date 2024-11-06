from department.models import Department
from django.contrib import admin


# Register your models here.
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = []
    search_fields = []
