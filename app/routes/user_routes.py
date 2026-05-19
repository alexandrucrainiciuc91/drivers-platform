from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.user import (
    User
)

from app.schemas.user_schema import (
    UserCreate
)

from app.auth.security import (
    hash_password,
    verify_password
)

from app.auth.jwt_handler import (
    create_access_token
)

from app.auth.dependencies import (
    get_current_user
)

from app.services.email_service import (
    send_verification_email,
    send_reset_password_email
)

from app.services.token_service import (
    create_email_token,
    verify_email_token
)

router = APIRouter()


# =====================================================
# REGISTER
# =====================================================

@router.post("/register")
def register_user(
    user: UserCreate
):

    db: Session = SessionLocal()

    existing_user = db.query(
        User
    ).filter(
        User.email == user.email
    ).first()

    if existing_user:

        db.close()

        return {
            "error":
                "Email already exists"
        }

    new_user = User(

        email=user.email,

        password=hash_password(
            user.password
        ),

        role=user.role,

        subscription_plan="free",

        is_verified=False
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    # SEND VERIFY EMAIL

    token = create_email_token(
        new_user.email
    )

    send_verification_email(
        new_user.email,
        token
    )

    db.close()

    return {

        "message":
            "Account created successfully. Please verify your email."
    }


# =====================================================
# VERIFY EMAIL
# =====================================================

@router.get("/verify-email")
def verify_email(
    token: str
):

    db: Session = SessionLocal()

    try:

        payload = verify_email_token(
            token
        )

        email = payload["email"]

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:

            db.close()

            return {
                "error":
                    "User not found"
            }

        user.is_verified = True

        db.commit()

        db.close()

        return {
            "message":
                "Email verified successfully"
        }

    except Exception as e:

        db.close()

        return {
            "error":
                str(e)
        }


# =====================================================
# LOGIN
# =====================================================

@router.post("/login")
def login_user(

    form_data:
    OAuth2PasswordRequestForm = Depends()

):

    db: Session = SessionLocal()

    existing_user = db.query(
        User
    ).filter(
        User.email ==
        form_data.username
    ).first()

    if not existing_user:

        db.close()

        return {
            "error":
                "Invalid email or password"
        }

    valid_password = verify_password(

        form_data.password,

        existing_user.password
    )

    if not valid_password:

        db.close()

        return {
            "error":
                "Invalid email or password"
        }

    # EMAIL NOT VERIFIED

    if not existing_user.is_verified:

        db.close()

        raise HTTPException(

            status_code=403,

            detail=
            "Please verify your email first"
        )

    token = create_access_token(
        data={
            "user_id":
                existing_user.id,

            "role":
                existing_user.role
        }
    )

    db.close()

    return {

        "access_token":
            token,

        "token_type":
            "bearer",

        "user_type":
            existing_user.role,

        "subscription_plan":
            existing_user.subscription_plan,

        "user": {

            "id":
                existing_user.id
        }
    }


# =====================================================
# CURRENT USER
# =====================================================

@router.get("/me")
def current_logged_user(

    current_user=Depends(
        get_current_user
    )
):

    return {

        "id":
            current_user.id,

        "email":
            current_user.email,

        "role":
            current_user.role,

        "subscription_plan":
            current_user.subscription_plan
    }


# =====================================================
# UPGRADE PLAN
# =====================================================

@router.put("/upgrade-plan")
def upgrade_plan(

    current_user=Depends(
        get_current_user
    )
):

    db: Session = SessionLocal()

    user = db.query(
        User
    ).filter(
        User.id ==
        current_user.id
    ).first()

    if not user:

        db.close()

        return {
            "error":
                "User not found"
        }

    # DRIVER PLAN

    if user.role == "driver":

        user.subscription_plan = "pro"

    # COMPANY PLAN

    elif user.role == "company":

        user.subscription_plan = "business"

    db.commit()

    db.refresh(user)

    db.close()

    return {

        "message":
            "Plan upgraded successfully",

        "new_plan":
            user.subscription_plan
    }