from fastapi import (
    APIRouter,
    HTTPException,
    Depends
)

from fastapi.responses import (
    RedirectResponse
)

from sqlalchemy.orm import Session

from jose import jwt

import os

from dotenv import load_dotenv

from app.database.database import (
    SessionLocal
)

from app.models.user import User

load_dotenv()

router = APIRouter()

JWT_SECRET = os.getenv(
    "JWT_SECRET"
)


# ============================================
# DATABASE
# ============================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


# ============================================
# VERIFY EMAIL
# ============================================

@router.get("/verify-email/{token}")
def verify_email(

    token: str,

    db: Session = Depends(get_db)
):

    try:

        payload = jwt.decode(

            token,

            JWT_SECRET,

            algorithms=["HS256"]
        )

        user_id = payload.get(
            "user_id"
        )

        user = db.query(User).filter(
            User.id == user_id
        ).first()

        if not user:

            raise HTTPException(

                status_code=404,

                detail="User not found"
            )

        # ALREADY VERIFIED

        if user.is_verified:

            return RedirectResponse(
                url="https://drivelinkeed.com/login"
            )

        user.is_verified = True

        db.commit()

        return RedirectResponse(
            url="https://drivelinkeed.com/login"
        )

    except Exception:

        raise HTTPException(

            status_code=400,

            detail="Invalid or expired token"
        )