# expenses/middlewares.py

from django.contrib.auth import authenticate
from django.utils.deprecation import MiddlewareMixin
from rest_framework import exceptions
from rest_framework.authtoken.models import Token

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Check if Authorization header with Bearer token exists
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            # Validate JWT token
            user = self.authenticate_token(token)
            if user:
                request.user = user
            else:
                raise exceptions.AuthenticationFailed('Invalid token')

    def authenticate_token(self, token):
        try:
            token_obj = Token.objects.get(key=token)
            return token_obj.user
        except Token.DoesNotExist:
            return None
