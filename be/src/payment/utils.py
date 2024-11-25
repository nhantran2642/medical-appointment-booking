from appointment.utils import encode_appointment_data
from payment.vnpay import VNPay
from api import settings
import datetime
import uuid


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def generate_vnpay_payment_url(request, user_id, amount, doctor_id, appointment_datetime, order_desc, order_type="billpayment",
                               bank_code=None,
                               language='vn'):
    transaction_ref = encode_appointment_data(user_id, doctor_id, appointment_datetime)
    vnp = VNPay()
    vnp.request_data['vnp_Version'] = '2.1.0'
    vnp.request_data['vnp_Command'] = 'pay'
    vnp.request_data['vnp_TmnCode'] = settings.VNPAY_TMN_CODE
    vnp.request_data['vnp_Amount'] = amount * 100
    vnp.request_data['vnp_CurrCode'] = 'VND'
    vnp.request_data['vnp_TxnRef'] = transaction_ref
    vnp.request_data['vnp_OrderInfo'] = order_desc
    vnp.request_data['vnp_OrderType'] = order_type
    vnp.request_data['vnp_Locale'] = language
    vnp.request_data['vnp_ReturnUrl'] = settings.VNPAY_RETURN_URL
    vnp.request_data['vnp_CreateDate'] = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    vnp.request_data['vnp_IpAddr'] = get_client_ip(request)
    if bank_code:
        vnp.request_data['vnp_BankCode'] = bank_code

    return vnp.create_payment_url(settings.VNPAY_URL, settings.VNPAY_HASH_SECRET)
