from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.auth.dependencies import (
    get_current_user,
    require_driver,
    require_company
)

from app.models.driver_profile import (
    DriverProfile
)

from app.models.company_profile import (
    CompanyProfile
)

from app.models.application import (
    Application
)

from app.models.saved_job import (
    SavedJob
)

from app.models.notification import (
    Notification
)

from app.schemas.driver_profile_schema import (
    DriverProfileCreate
)

from app.services.matching_service import (
    calculate_match_score
)

router = APIRouter()

# =====================================================
# CREATE DRIVER PROFILE
# =====================================================

@router.post("/driver-profile")
def create_driver_profile(

        profile: DriverProfileCreate,

        current_user=Depends(
            require_driver
        )
):

    db: Session = SessionLocal()

    existing_profile = db.query(
        DriverProfile
    ).filter(
        DriverProfile.user_id ==
        current_user.id
    ).first()

    if existing_profile:

        db.close()

        return {
            "error":
                "Driver profile already exists"
        }

    new_profile = DriverProfile(

        user_id=current_user.id,

        full_name=profile.full_name,

        city=profile.city,

        experience_years=profile.experience_years,

        license_category=profile.license_category,

        preferred_countries=profile.preferred_countries,

        adr_certificate=profile.adr_certificate,

        availability=profile.availability,

        phone=profile.phone,

        about=profile.about,

        profile_photo=
        profile.profile_photo,

        driver_license_photo=
        profile.driver_license_photo,

        adr_certificate_photo=
        profile.adr_certificate_photo
    )

    db.add(new_profile)

    db.commit()

    db.refresh(new_profile)

    db.close()

    return {

        "message":
            "Driver profile created",

        "profile_id":
            new_profile.id
    }

# =====================================================
# DRIVER DASHBOARD
# =====================================================

@router.get("/driver/dashboard")
def driver_dashboard(

        current_user=Depends(
            require_driver
        )
):

    db: Session = SessionLocal()

    try:

        driver_profile = db.query(
            DriverProfile
        ).filter(
            DriverProfile.user_id ==
            current_user.id
        ).first()

        if not driver_profile:

            return {
                "error":
                    "Driver profile not found"
            }

        applications_count = db.query(
            Application
        ).filter(
            Application.driver_profile_id ==
            driver_profile.id
        ).count()

        saved_jobs_count = db.query(
            SavedJob
        ).filter(
            SavedJob.driver_profile_id ==
            driver_profile.id
        ).count()

        # TEMP CHAT COUNT
        unread_messages = 0

        notifications_count = db.query(
            Notification
        ).filter(

            Notification.user_id ==
            current_user.id,

            Notification.is_read == False

        ).count()

        return {

            "driver_name":
                driver_profile.full_name,

            "applications_count":
                applications_count,

            "saved_jobs_count":
                saved_jobs_count,

            "messages_count":
                unread_messages,

            "notifications_count":
                notifications_count
        }

    except Exception as e:

        print(
            "DRIVER DASHBOARD ERROR:",
            e
        )

        return {
            "error":
                "SERVER_ERROR"
        }

    finally:

        db.close()

# =====================================================
# MY DRIVER PROFILE
# =====================================================

@router.get("/driver-profile/me")
def my_driver_profile(

        current_user=Depends(
            require_driver
        )
):

    db: Session = SessionLocal()

    profile = db.query(
        DriverProfile
    ).filter(
        DriverProfile.user_id ==
        current_user.id
    ).first()

    db.close()

    if not profile:

        return {
            "has_profile": False
        }

    return {
        "has_profile": True,
        "profile": profile
    }

# =====================================================
# GET ALL DRIVERS
# =====================================================

@router.get("/drivers")
def get_drivers(

    current_user=Depends(
        require_company
    )

):

    db: Session = SessionLocal()

    profiles = db.query(
        DriverProfile
    ).all()

    if current_user.subscription_plan == "free":

        profiles = profiles[:3]

    result = []

    for profile in profiles:

        user = db.query(User).filter(
            User.id == profile.user_id
        ).first()

        result.append({

            "id": profile.id,

            "full_name":
                profile.full_name,

            "city":
                profile.city,

            "experience_years":
                profile.experience_years,

            "license_category":
                profile.license_category,

            "preferred_countries":
                profile.preferred_countries,

            "profile_photo":
                profile.profile_photo,

            "driver_verified":
                user.driver_verified
                if user else False
        })

    db.close()

    return result

# =====================================================
# SEARCH DRIVERS
# =====================================================

@router.get("/drivers/search")
def search_drivers(

        license_category: str = None,

        preferred_countries: str = None,

        min_experience: int = None
):

    db: Session = SessionLocal()

    query = db.query(
        DriverProfile
    )

    if license_category:

        query = query.filter(
            DriverProfile.license_category ==
            license_category
        )

    if preferred_countries:

        query = query.filter(
            DriverProfile.preferred_countries ==
            preferred_countries
        )

    if min_experience:

        query = query.filter(
            DriverProfile.experience_years >=
            min_experience
        )

    results = query.all()

    response = []

    for profile in results:
        user = db.query(User).filter(
            User.id == profile.user_id
        ).first()

        response.append({

            "id": profile.id,

            "full_name":
                profile.full_name,

            "city":
                profile.city,

            "experience_years":
                profile.experience_years,

            "license_category":
                profile.license_category,

            "preferred_countries":
                profile.preferred_countries,

            "profile_photo":
                profile.profile_photo,

            "driver_verified":
                user.driver_verified
                if user else False
        })

    db.close()

    return response

# =====================================================
# MATCH DRIVERS
# =====================================================

@router.get("/match-drivers")
def match_drivers():

    db: Session = SessionLocal()

    driver = db.query(
        DriverProfile
    ).first()

    companies = db.query(
        CompanyProfile
    ).all()

    results = []

    for company in companies:

        score = calculate_match_score(
            driver,
            company
        )

        results.append({

            "company_name":
                company.company_name,

            "match_score":
                score
        })

    db.close()

    return results

# =====================================================
# GET SINGLE DRIVER PROFILE
# IMPORTANT:
# DYNAMIC ROUTES MUST BE LAST
# =====================================================

@router.get("/drivers/{driver_id}")
def get_driver_profile(

        driver_id: int,

        current_user=Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    driver = db.query(
        DriverProfile
    ).filter(
        DriverProfile.id == driver_id
    ).first()

    db.close()

    if not driver:

        return {
            "error":
                "Driver not found"
        }

    return driver