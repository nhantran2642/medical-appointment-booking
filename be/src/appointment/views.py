from appointment.serializers import AppointmentSerializer
from rest_framework import viewsets


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    http_method_names = ["get", "post", "put", "delete"]

    def get_queryset(self):
        queryset = AppointmentViewSet.objects.all()
        return queryset
