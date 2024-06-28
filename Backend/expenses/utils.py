
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.authtoken.models import Token

def generate_jwt_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1),  # Token expiry time (1 day)
        'iat': datetime.utcnow(),  # Token issue time
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('Token expired')
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed('Invalid token')

def get_token(user):
    token, _ = Token.objects.get_or_create(user=user)
    return token.key
