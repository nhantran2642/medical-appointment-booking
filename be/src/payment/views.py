import datetime

from django.db import transaction
from django.http import HttpResponseRedirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api import settings
from appointment.serializers import AppointmentSerializer
from appointment.utils import decode_appointment_data
from authentication.models import User
from payment.utils import generate_vnpay_payment_url
from payment.vnpay import VNPay
from utilities.email.mailer import send_appointment_notification


class VNPayCreatePaymentView(APIView):
    def post(self, request):
        order_type = request.data.get('order_type', 'billpayment')
        order_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        amount = int(request.data.get('amount', 0))
        order_desc = request.data.get('order_desc', 'Thanh toan hoa don')
        bank_code = request.data.get('bank_code', '')
        language = request.data.get('language', 'vn')

        payment_url = generate_vnpay_payment_url(request, amount, order_id, order_desc, order_type, bank_code=bank_code, language=language)
        return Response({'payment_url': payment_url})


class VNPayReturnView(APIView):
    @transaction.atomic
    def get(self, request):
        vnp = VNPay()
        vnp.response_data = request.query_params.dict()

        if vnp.validate_response(settings.VNPAY_HASH_SECRET):
            response_code = vnp.response_data.get('vnp_ResponseCode')
            if response_code == '00':  # Giao dịch thành công
                try:
                    transaction_ref = vnp.response_data.get('vnp_TxnRef')
                    appointment_data = decode_appointment_data(transaction_ref)
                    user = User.objects.get(pk=appointment_data.get('user_id'))
                    data = {
                        "doctor_id": appointment_data.get('doctor_id'),
                        "appointment_date": appointment_data.get('appointment_datetime'),
                        "status": "Scheduled",
                    }
                    serializer = AppointmentSerializer(data=data, context={"user_id": appointment_data.get('user_id')})
                    serializer.is_valid(raise_exception=True)
                    appointment = serializer.save()

                    send_appointment_notification(user, appointment)

                    redirect_url = (
                        f"{settings.WEBSITE_URL}/payment/vnpay_return/"
                        f"?vnp_Amount={vnp.response_data.get('vnp_Amount')}"
                        f"&vnp_OrderInfo={vnp.response_data.get('vnp_OrderInfo')}"
                    )

                    return HttpResponseRedirect(redirect_url)
                except (KeyError, ValueError) as e:
                    return Response({'message': 'Dữ liệu không hợp lệ', 'error': str(e)},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'Thanh toán thất bại', 'data': vnp.response_data})
        else:
            return Response({'message': 'Sai chữ ký', 'data': vnp.response_data})
