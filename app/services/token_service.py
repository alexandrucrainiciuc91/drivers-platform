import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("JWT_SECRET")


def create_email_token(email: str):

    payload = {

        "email": email,

        "exp": datetime.utcnow() + timedelta(hours=24)
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )


def verify_email_token(token: str):

    return jwt.decode(
        token,
        SECRET_KEY,
        algorithms=["HS256"]
    )