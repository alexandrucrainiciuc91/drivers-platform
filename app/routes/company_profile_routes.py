from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.auth.dependencies import (
    require_company
)

from app.models.company_profile import (
    CompanyProfile
)

from app.schemas.company_profile_schema import (
    CompanyProfileCreate
)

from app.models.job_post import (
    JobPost
)

from app.models.application import (
    Application
)

router = APIRouter()


@router.post("/company-profile")
def create_company_profile(

        profile: CompanyProfileCreate,

        current_user=Depends(
            require_company
        )
):

    db: Session = SessionLocal()

    existing_profile = db.query(
        CompanyProfile
    ).filter(
        CompanyProfile.user_id ==
        current_user.id
    ).first()

    if existing_profile:

        db.close()

        return {
            "error":
                "Company profile already exists"
        }

    new_profile = CompanyProfile(

        user_id=current_user.id,

        company_name=profile.company_name,

        country=profile.country,

        city=profile.city,

        fleet_size=profile.fleet_size,

        transport_type=profile.transport_type,

        website=profile.website,

        phone=profile.phone,

        description=profile.description
    )

    db.add(new_profile)

    db.commit()

    db.refresh(new_profile)

    db.close()

    return {

        "message":
            "Company profile created successfully",

        "profile_id":
            new_profile.id
    }


@router.get("/company/dashboard")
def company_dashboard(

        current_user=Depends(
            require_company
        )
):

    db: Session = SessionLocal()

    company_profile = db.query(
        CompanyProfile
    ).filter(
        CompanyProfile.user_id ==
        current_user.id
    ).first()

    if not company_profile:

        db.close()

        return {
            "error":
                "Company profile not found"
        }

    total_jobs = db.query(
        JobPost
    ).filter(
        JobPost.company_profile_id ==
        company_profile.id
    ).count()

    total_applications = db.query(
        Application
    ).filter(
        Application.company_profile_id ==
        company_profile.id
    ).count()

    pending_applications = db.query(
        Application
    ).filter(

        Application.company_profile_id ==
        company_profile.id,

        Application.status == "pending"

    ).count()

    db.close()

    return {

        "company_name":
            company_profile.company_name,

        "fleet_size":
            company_profile.fleet_size,

        "country":
            company_profile.country,

        "city":
            company_profile.city,

        "transport_type":
            company_profile.transport_type,

        "website":
            company_profile.website,

        "phone":
            company_profile.phone,

        "description":
            company_profile.description,

        "total_jobs":
            total_jobs,

        "total_applications":
            total_applications,

        "pending_applications":
            pending_applications
    }
@router.get("/company-profile/me")
def my_company_profile(
        current_user=Depends(require_company)
):

    db: Session = SessionLocal()

    profile = db.query(
        CompanyProfile
    ).filter(
        CompanyProfile.user_id ==
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