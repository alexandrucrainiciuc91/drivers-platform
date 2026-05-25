from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from pydantic import BaseModel

from app.database.database import (
    SessionLocal
)

from app.models.load_application import (
    LoadApplication
)

from app.models.load import (
    Load
)

from app.models.user import (
    User
)

from app.auth.dependencies import (
    get_current_user
)
from app.models.driver_profile import (
    DriverProfile
)
router = APIRouter()


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
# SCHEMA
# =====================================================

class ApplicationCreate(BaseModel):

    message: str


# =====================================================
# APPLY TO LOAD
# =====================================================

@router.post(
    "/load/{load_id}/apply"
)

def apply_to_load(

    load_id: int,

    application: ApplicationCreate,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    # DRIVER ONLY

    if current_user.role != "driver":

        raise HTTPException(

            status_code=403,

            detail=
            "Only drivers can apply"
        )

    # LOAD EXISTS

    load = db.query(
        Load
    ).filter(
        Load.id == load_id
    ).first()

    if not load:

        raise HTTPException(

            status_code=404,

            detail="Load not found"
        )

    # DUPLICATE CHECK

    existing = db.query(
        LoadApplication
    ).filter(

        LoadApplication.load_id
        == load_id,

        LoadApplication.driver_id
        == current_user.id

    ).first()

    if existing:

        raise HTTPException(

            status_code=400,

            detail=
            "Already applied"
        )

    # CREATE APPLICATION

    new_application = LoadApplication(

        load_id=load_id,

        driver_id=
        current_user.id,

        message=
        application.message
    )

    db.add(new_application)

    db.commit()

    db.refresh(new_application)

    return {

        "message":
        "Application sent"
    }


# =====================================================
# GET LOAD APPLICATIONS
# =====================================================

@router.get(
    "/load/{load_id}/applications"
)

def get_load_applications(

    load_id: int,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    load = db.query(
        Load
    ).filter(
        Load.id == load_id
    ).first()

    if not load:

        raise HTTPException(

            status_code=404,

            detail="Load not found"
        )

    # ONLY OWNER COMPANY

    if load.company_id != current_user.id:

        raise HTTPException(

            status_code=403,

            detail="Unauthorized"
        )

    applications = db.query(
        LoadApplication
    ).filter(
        LoadApplication.load_id
        == load_id
    ).all()

    result = []

    for application in applications:
        driver = db.query(
            User
        ).filter(
            User.id ==
            application.driver_id
        ).first()

        driver_profile = db.query(
            DriverProfile
        ).filter(
            DriverProfile.user_id ==
            application.driver_id
        ).first()

        result.append({

            "id":
                application.id,

            "message":
                application.message,

            "status":
                application.status,

            "driver": {

                "id":
                    driver.id,

                "email":
                    driver.email,

                "full_name":
                    driver_profile.full_name
                    if driver_profile else None,

                "experience":
                    driver_profile.experience
                    if driver_profile else None,

                "truck_type":
                    driver_profile.truck_type
                    if driver_profile else None,

                "phone":
                    driver_profile.phone
                    if driver_profile else None,

                "country":
                    driver_profile.country
                    if driver_profile else None
            }
        })
    print("LOAD ID:", load_id)
    print("APPLICATIONS:", applications)
    return result
@router.post(
    "/application/{application_id}/accept"
)

def accept_application(

    application_id: int,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    application = db.query(
        LoadApplication
    ).filter(
        LoadApplication.id
        == application_id
    ).first()

    if not application:

        raise HTTPException(

            status_code=404,

            detail="Application not found"
        )

    load = db.query(
        Load
    ).filter(
        Load.id
        == application.load_id
    ).first()

    # ONLY COMPANY OWNER

    if load.company_id != current_user.id:

        raise HTTPException(

            status_code=403,

            detail="Unauthorized"
        )

    # ACCEPT

    application.status = "accepted"


    # LOAD ASSIGNED

    load.status = "assigned"

    load.assigned_driver_id = (
        application.driver_id
    )
    db.delete(load)

    db.commit()

    return {

        "message":
            "Driver accepted"
    }