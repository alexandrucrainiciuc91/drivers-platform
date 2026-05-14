from jose import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "SUPER_SECRET_KEY"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 100000


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt
def verify_token(token: str):

    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    return payload