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

class LoadCreate(BaseModel):

    pickup_country: str

    pickup_city: str

    delivery_country: str

    delivery_city: str

    distance_km: int

    price: int

    transport_type: str

    cargo_type: str

    total_weight: str

    special_requirements: str

    loading_date: str

    phone: str


# =====================================================
# CREATE LOAD
# =====================================================

@router.post("/create-load")
def create_load(

    load: LoadCreate,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):

    # ============================================
    # COMPANY ONLY
    # ============================================

    if current_user.role != "company":

        raise HTTPException(

            status_code=403,

            detail=
            "Only companies can post loads"
        )

    # ============================================
    # CREATE LOAD
    # ============================================

    new_load = Load(

        company_id=
            current_user.id,

        pickup_country=
            load.pickup_country,

        pickup_city=
            load.pickup_city,

        delivery_country=
            load.delivery_country,

        delivery_city=
            load.delivery_city,

        distance_km=
            load.distance_km,

        price=
            load.price,

        transport_type=
            load.transport_type,

        cargo_type=
            load.cargo_type,

        total_weight=
            load.total_weight,

        special_requirements=
            load.special_requirements,

        loading_date=
            load.loading_date,

        phone=
            load.phone,

        status="available"
    )

    db.add(new_load)

    db.commit()

    db.refresh(new_load)

    return {

        "message":
            "Load created successfully",

        "load_id":
            new_load.id
    }


# =====================================================
# GET LOADS
# =====================================================

@router.get("/loads")
def get_loads(

    db: Session = Depends(get_db)
):

    loads = db.query(
        Load
    ).all()

    return loads