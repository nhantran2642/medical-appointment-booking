from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permission import IsAuthenticated


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "create":
            return AppointmentSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        queryset = Appointment.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
