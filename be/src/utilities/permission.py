from api import constants
from rest_framework import permissions


class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role_id == constants.USER_ROLE["STAFF"]


class IsDoctorUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role_id == constants.USER_ROLE["DOCTOR"]
