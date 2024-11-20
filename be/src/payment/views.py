from rest_framework.views import APIView
from rest_framework.response import Response
from api import settings
from utilities.vnpay.vnpay import VNPay
import datetime


class VNPayCreatePaymentView(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        order_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')

        vnpay = VNPay(
            tmn_code=settings.VNPAY_TMN_CODE,
            hash_secret=settings.VNPAY_HASH_SECRET,
            return_url=settings.VNPAY_RETURN_URL
        )

        vnpay.set_param('vnp_Version', '2.1.0')
        vnpay.set_param('vnp_Command', 'pay')
        vnpay.set_param('vnp_CurrCode', 'VND')
        vnpay.set_param('vnp_Amount', int(amount) * 100)

        vnpay.set_param('vnp_CreateDate', datetime.datetime.now().strftime('%Y%m%d%H%M%S'))
        vnpay.set_param('vnp_IpAddr', request.META['REMOTE_ADDR'])
        vnpay.set_param('vnp_Locale', 'vn')
        vnpay.set_param('vnp_OrderInfo', f'Thanh toan don hang {order_id}')
        vnpay.set_param('vnp_OrderType', 'billpayment')
        vnpay.set_param('vnp_TxnRef', order_id)

        payment_url = vnpay.create_request_url(settings.VNPAY_URL)
        return Response({'payment_url': payment_url})


class VNPayReturnView(APIView):
    def get(self, request):
        vnpay = VNPay(
            tmn_code=settings.VNPAY_TMN_CODE,
            hash_secret=settings.VNPAY_HASH_SECRET,
            return_url=settings.VNPAY_RETURN_URL
        )

        query_params = request.query_params.dict()
        is_valid = vnpay.validate_response(query_params)

        if is_valid and query_params.get('vnp_ResponseCode') == '00':  # '00' là thành công
            return Response({'message': 'Thanh toán thành công', 'data': query_params})
        else:
            return Response({'message': 'Thanh toán thất bại', 'data': query_params})
