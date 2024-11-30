from api import constants
from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["ADMIN"]


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id in [
            constants.USER_ROLE["ADMIN"],
            constants.USER_ROLE["USER"],
        ]


class IsAdminDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id in [
            constants.USER_ROLE["ADMIN"],
            constants.USER_ROLE["DOCTOR"],
        ]


class IsAdminDoctorStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id in [
            constants.USER_ROLE["ADMIN"],
            constants.USER_ROLE["DOCTOR"],
            constants.USER_ROLE["STAFF"],
        ]


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["STAFF"]


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["DOCTOR"]


class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.role_id == constants.USER_ROLE["USER"]
