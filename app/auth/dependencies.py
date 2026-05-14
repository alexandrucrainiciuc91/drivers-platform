from fastapi import (
    Depends,
    HTTPException,
    status
)

from fastapi.security import (
    OAuth2PasswordBearer
)

from sqlalchemy.orm import Session

from jose import JWTError

from app.database.database import (
    SessionLocal
)

from app.auth.jwt_handler import (
    verify_token
)

from app.models.user import (
    User
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

# ============================================
# GET CURRENT USER
# ============================================

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    try:

        payload = verify_token(token)

        user_id = payload.get(
            "user_id"
        )

        if not user_id:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Could not validate token"
        )

    db: Session = SessionLocal()

    try:

        user = db.query(User).filter(
            User.id == user_id
        ).first()

        if not user:

            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return user

    finally:

        db.close()

# ============================================
# REQUIRE COMPANY
# ============================================

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

# ============================================
# REQUIRE DRIVER
# ============================================

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