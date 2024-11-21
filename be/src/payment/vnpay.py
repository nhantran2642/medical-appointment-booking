import hashlib
import hmac
import urllib.parse


class VNPay:
    def __init__(self):
        self.request_data = {}
        self.response_data = {}

    def create_payment_url(self, vnpay_payment_url, secret_key):
        input_data = sorted(self.request_data.items())
        query_string = ''
        seq = 0
        for key, val in input_data:
            if seq == 1:
                query_string = query_string + "&" + key + '=' + urllib.parse.quote_plus(str(val))
            else:
                seq = 1
                query_string = key + '=' + urllib.parse.quote_plus(str(val))

        hash_value = self.__hmacsha512(secret_key, query_string)
        return vnpay_payment_url + "?" + query_string + '&vnp_SecureHash=' + hash_value

    def validate_response(self, secret_key):
        vnp_secure_hash = self.response_data.pop('vnp_SecureHash', None)
        self.response_data.pop('vnp_SecureHashType', None)
        input_data = sorted(self.response_data.items())
        has_data = ''
        seq = 0
        for key, val in input_data:
            if seq == 1:
                has_data = has_data + "&" + str(key) + '=' + urllib.parse.quote_plus(str(val))
            else:
                seq = 1
                has_data = str(key) + '=' + urllib.parse.quote_plus(str(val))

        hash_value = self.__hmacsha512(secret_key, has_data)
        return vnp_secure_hash == hash_value

    @staticmethod
    def __hmacsha512(key, data):
        byte_key = key.encode('utf-8')
        byte_data = data.encode('utf-8')
        return hmac.new(byte_key, byte_data, hashlib.sha512).hexdigest()
