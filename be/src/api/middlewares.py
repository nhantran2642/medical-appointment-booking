import jwt
from django.conf import settings
from django.http import JsonResponse
from rest_framework.exceptions import AuthenticationFailed


class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def _check_token(self, token: str):
        try:
            return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.exceptions.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except Exception:
            raise AuthenticationFailed("Invalid Token")

    def __call__(self, request):
        public_endpoints = [
            "login",
            "register",
            "verify_email",
            "reset_password",
            "password-reset",
            "redoc",
            "static",
        ]
        if request.path != "/":
            for endpoint in public_endpoints:
                if endpoint in request.path:
                    return self.get_response(request)
        else:
            return self.get_response(request)

        auth = request.headers.get("Authorization", "").split(" ")

        if len(auth) != 2 or auth[0] != "Bearer":
            return JsonResponse({"message": "Authorization header missing"}, status=401)
        else:
            try:
                payload = self._check_token(auth[1])
                request.role_id = payload.get("role_id")
            except AuthenticationFailed as e:
                return JsonResponse({"message": str(e)}, status=401)

        response = self.get_response(request)
        return response
