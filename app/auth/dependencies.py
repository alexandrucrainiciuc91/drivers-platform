from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.auth.jwt_handler import verify_token
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)


def get_current_user(
        token: str = Depends(oauth2_scheme)
):

    payload = verify_token(token)

    user_id = payload.get("user_id")

    db: Session = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    db.close()

    return user


def require_company(

        current_user=Depends(
            get_current_user
        )
):

    if current_user.role != "company":

        raise HTTPException(
            status_code=403,
            detail="Only companies allowed"
        )

    return current_user


def require_driver(

        current_user=Depends(
            get_current_user
        )
):

    if current_user.role != "driver":

        raise HTTPException(
            status_code=403,
            detail="Only drivers allowed"
        )

    return current_user