from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from fastapi import HTTPException
from fastapi.responses import (
    RedirectResponse
)
from fastapi import UploadFile
from fastapi import File

from app.services.cloudinary_service import (
    upload_file
)
from fastapi.security import (
    OAuth2PasswordRequestForm
)
from app.models.driver_profile import DriverProfile
from sqlalchemy.orm import Session

from jose import jwt

import os

from dotenv import load_dotenv

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
from app.models.driver_profile import DriverProfile
from app.models.user import User
from app.models.user import User
from app.models.job_post import JobPost
from app.models.application import Application
from app.models.load import Load
router = APIRouter()

load_dotenv()

JWT_SECRET = os.getenv(
    "JWT_SECRET"
)


# =====================================================
# DATABASE
# =====================================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


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

    # ============================================
    # CREATE VERIFY TOKEN
    # ============================================

    token = jwt.encode(

        {
            "user_id":
                new_user.id
        },

        JWT_SECRET,

        algorithm="HS256"
    )

    # ============================================
    # SEND VERIFY EMAIL
    # ============================================

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

@router.get("/verify-email/{token}")
def verify_email(
    token: str
):

    db: Session = SessionLocal()

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

            db.close()

            raise HTTPException(

                status_code=404,

                detail="User not found"
            )

        # ============================================
        # ALREADY VERIFIED
        # ============================================

        if user.is_verified:

            db.close()

            return RedirectResponse(
                url="https://drivelinkeed.com/login"
            )

        # ============================================
        # VERIFY USER
        # ============================================

        user.is_verified = True

        db.commit()

        db.close()

        return RedirectResponse(
            url="https://drivelinkeed.com/login"
        )

    except Exception:

        db.close()

        raise HTTPException(

            status_code=400,

            detail="Invalid or expired token"
        )


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

    # ============================================
    # USER EXISTS
    # ============================================

    if not existing_user:

        db.close()

        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"
        )

    # ============================================
    # VERIFY PASSWORD
    # ============================================

    valid_password = verify_password(

        form_data.password,

        existing_user.password
    )

    if not valid_password:

        db.close()

        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"
        )

    # ============================================
    # EMAIL VERIFIED
    # ============================================

    if not existing_user.is_verified:

        db.close()

        raise HTTPException(

            status_code=403,

            detail=
            "Please verify your email first"
        )

    # ============================================
    # CREATE LOGIN TOKEN
    # ============================================

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

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )

    # ============================================
    # DRIVER PLAN
    # ============================================

    if user.role == "driver":

        user.subscription_plan = "pro"

    # ============================================
    # COMPANY PLAN
    # ============================================

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
@router.put(
    "/verify-driver/{driver_id}"
)
def verify_driver(

    driver_id: int,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    if current_user.role != "admin":

        raise HTTPException(

            status_code=403,

            detail="Not authorized"
        )

    driver = db.query(User).filter(
        User.id == driver_id
    ).first()

    if not driver:

        raise HTTPException(

            status_code=404,

            detail="Driver not found"
        )

    driver.driver_verified = True

    db.commit()

    return {
        "message":
        "Driver verified"
    }
@router.post("/upload-profile-photo")
def upload_profile_photo(

    file: UploadFile = File(...),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    image_url = upload_file(file)

    current_user.profile_photo = image_url

    db.commit()

    return {
        "image_url": image_url
    }
@router.post("/upload-license")
def upload_license(

    file: UploadFile = File(...),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    image_url = upload_file(file)

    current_user.driver_license_photo = image_url

    db.commit()

    return {
        "image_url": image_url
    }
@router.post("/upload-adr")
def upload_adr(

    file: UploadFile = File(...),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    image_url = upload_file(file)

    current_user.adr_certificate_photo = image_url

    db.commit()

    return {
        "image_url": image_url
    }
@router.get("/admin/drivers")
def get_all_drivers(

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    profiles = db.query(
        DriverProfile
    ).all()

    result = []

    for profile in profiles:

        user = db.query(User).filter(
            User.id == profile.user_id
        ).first()

        if not user:
            continue

        result.append({

            "id": user.id,

            "email": user.email,

            "profile_photo":
                profile.profile_photo,

            "driver_license_photo":
                profile.driver_license_photo,

            "adr_certificate_photo":
                profile.adr_certificate_photo,

            "driver_verified":
                User.driver_verified
        })

    return result
@router.get("/admin/stats")
def get_admin_stats(

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return {

        "drivers":
            db.query(User).filter(
                User.role == "driver"
            ).count(),

        "companies":
            db.query(User).filter(
                User.role == "company"
            ).count(),

        "verified_drivers":
            db.query(User).filter(
                User.driver_verified == True
            ).count(),

        "pro_users":
            db.query(User).filter(
                User.subscription_plan == "pro"
            ).count()
    }