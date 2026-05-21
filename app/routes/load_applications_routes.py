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

    return applications