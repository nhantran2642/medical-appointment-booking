from api import constants
from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["ADMIN"]


class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["STAFF"]


class IsDoctorUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["DOCTOR"]


class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["USER"]
