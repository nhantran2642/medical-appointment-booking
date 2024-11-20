import hashlib
import hmac
import urllib.parse


class VNPay:
    def __init__(self, tmn_code, hash_secret, return_url):
        self.vnp_TmnCode = tmn_code
        self.vnp_HashSecret = hash_secret
        self.vnp_ReturnUrl = return_url
        self.params = {}

    def set_param(self, key, value):
        self.params[key] = value

    def create_request_url(self, payment_url):
        self.params['vnp_TmnCode'] = self.vnp_TmnCode
        self.params['vnp_ReturnUrl'] = self.vnp_ReturnUrl
        self.params = dict(sorted(self.params.items()))

        query_string = urllib.parse.urlencode(self.params)
        hash_data = '&'.join([f"{k}={v}" for k, v in self.params.items()])
        secure_hash = self.hmacsha512(self.vnp_HashSecret, hash_data)

        return f"{payment_url}?{query_string}&vnp_SecureHash={secure_hash}"

    def validate_response(self, query_params):
        vnp_secure_hash = query_params.pop('vnp_SecureHash', None)
        query_params = dict(sorted(query_params.items()))
        hash_data = '&'.join([f"{k}={v}" for k, v in query_params.items()])
        secure_hash = self.hmacsha512(vnp_secure_hash, hash_data)

        return secure_hash == vnp_secure_hash

    @staticmethod
    def hmacsha512(key, data):
        byte_key = key.encode('utf-8')
        byte_data = data.encode('utf-8')
        return hmac.new(byte_key, byte_data, hashlib.sha512).hexdigest()
