import os

from datetime import (
    datetime,
    timedelta,
    timezone
)

from jose import jwt

from dotenv import load_dotenv

# ============================================
# LOAD ENV
# ============================================

load_dotenv()

# ============================================
# JWT CONFIG
# ============================================

SECRET_KEY = os.getenv(
    "JWT_SECRET"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 100000

# ============================================
# CREATE ACCESS TOKEN
# ============================================

def create_access_token(
        data: dict
):

    to_encode = data.copy()

    expire = (
        datetime.now(
            timezone.utc
        ) + timedelta(
            minutes=
            ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM
    )

    return encoded_jwt

# ============================================
# VERIFY TOKEN
# ============================================

def verify_token(
        token: str
):

    payload = jwt.decode(

        token,

        SECRET_KEY,

        algorithms=[ALGORITHM]
    )

    return payload