# Create your models here.
from authentication.managers import UserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from utilities.base import BaseModel


class Role(BaseModel):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "role"


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, db_index=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role = models.ForeignKey(
        Role,
        to_field="id",
        related_name="role",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email

        super().save(*args, **kwargs)

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        refresh["username"] = self.username
        refresh["email"] = self.email
        refresh["role_id"] = self.role_id

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    def get_full_name(self):
        try:
            full_name = f"{self.last_name} {self.first_name}"
        except AttributeError:
            full_name = self.email
        return full_name.strip()

    class Meta:
        ordering = ["-id"]
        db_table = "user"


class UserVerifyCode(BaseModel):
    id = models.BigAutoField(primary_key=True)
    code = models.CharField(max_length=8)
    expired_at = models.DateTimeField()
    verify_time = models.IntegerField(default=0)
    user = models.ForeignKey(
        "User", to_field="id", related_name="user_verify_code", on_delete=models.CASCADE
    )

    class Meta:
        db_table = "user_verify_code"
