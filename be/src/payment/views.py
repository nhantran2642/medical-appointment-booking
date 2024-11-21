from rest_framework.views import APIView
from rest_framework.response import Response
from api import settings
from payment.vnpay import VNPay
import datetime


class VNPayCreatePaymentView(APIView):
    def post(self, request):
        order_type = request.data.get('order_type', 'billpayment')
        order_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        amount = int(request.data.get('amount', 0))
        order_desc = request.data.get('order_desc', 'Thanh toan hoa don')
        bank_code = request.data.get('bank_code', '')
        language = request.data.get('language', 'vn')

        vnp = VNPay()
        vnp.request_data['vnp_Version'] = '2.1.0'
        vnp.request_data['vnp_Command'] = 'pay'
        vnp.request_data['vnp_TmnCode'] = settings.VNPAY_TMN_CODE
        vnp.request_data['vnp_Amount'] = amount * 100
        vnp.request_data['vnp_CurrCode'] = 'VND'
        vnp.request_data['vnp_TxnRef'] = order_id
        vnp.request_data['vnp_OrderInfo'] = order_desc
        vnp.request_data['vnp_OrderType'] = order_type
        vnp.request_data['vnp_Locale'] = language
        vnp.request_data['vnp_ReturnUrl'] = settings.VNPAY_RETURN_URL
        vnp.request_data['vnp_CreateDate'] = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        vnp.request_data['vnp_IpAddr'] = get_client_ip(request)

        if bank_code:
            vnp.request_data['vnp_BankCode'] = bank_code

        payment_url = vnp.create_payment_url(settings.VNPAY_URL, settings.VNPAY_HASH_SECRET)
        return Response({'payment_url': payment_url})


class VNPayReturnView(APIView):
    def get(self, request):
        vnp = VNPay()
        vnp.response_data = request.query_params.dict()

        if vnp.validate_response(settings.VNPAY_HASH_SECRET):
            response_code = vnp.response_data.get('vnp_ResponseCode')
            if response_code == '00':  # Giao dịch thành công
                return Response({'message': 'Thanh toán thành công', 'data': vnp.response_data})
            else:
                return Response({'message': 'Thanh toán thất bại', 'data': vnp.response_data})
        else:
            return Response({'message': 'Sai chữ ký', 'data': vnp.response_data})


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip