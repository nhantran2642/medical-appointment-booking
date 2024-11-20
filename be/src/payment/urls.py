from django.urls import path
from .views import VNPayCreatePaymentView, VNPayReturnView

urlpatterns = [
    path('vnpay_create/', VNPayCreatePaymentView.as_view(), name='vnpay_create'),
    path('vnpay_return/', VNPayReturnView.as_view(), name='vnpay_return'),
]
