from fastapi import (
    APIRouter,
    Depends
)
from app.models.company_profile import (
    CompanyProfile
)
from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)
from app.models.application import (
    Application
)

from app.models.driver_profile import (
    DriverProfile
)
from app.auth.dependencies import (
    require_driver,
    require_company
)
from app.auth.dependencies import (
    get_current_user
)
from app.models.job_post import (
    JobPost
)
from app.models.job_post import JobPost
from app.models.driver_profile import DriverProfile
router = APIRouter()


@router.post("/apply-job/{job_id}")
def apply_to_job(

        job_id: int,

        current_user = Depends(
            require_driver
        )
):

    db: Session = SessionLocal()

    driver_profile = db.query(
        DriverProfile
    ).filter(
        DriverProfile.user_id ==
        current_user.id
    ).first()

    if not driver_profile:

        db.close()

        return {
            "error":
                "Driver profile not found"
        }

    job = db.query(
        JobPost
    ).filter(
        JobPost.id == job_id
    ).first()
    # ============================================
    # FREE PLAN LIMIT
    # ============================================

    if current_user.subscription_plan == "free":

        applications_count = db.query(
            Application
        ).filter(
            Application.driver_profile_id ==
            driver_profile.id
        ).count()

        if applications_count >= 3:

            db.close()

            return {
                "error":
                    "FREE_PLAN_LIMIT_REACHED",
                "message":
                    "Upgrade to PRO DRIVER to apply to unlimited jobs."
            }
    if not job:

        db.close()

        return {
            "error":
                "Job not found"
        }

    new_application = Application(

        driver_profile_id =
            driver_profile.id,

        company_profile_id =
            job.company_profile_id,

        job_post_id =
            job.id
    )

    db.add(new_application)

    db.commit()

    db.refresh(new_application)

    db.close()

    return {
        "message":
            "Applied successfully",
        "application_id":
            new_application.id
    }
@router.get("/company/applications")
def get_company_applications(

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

    applications = db.query(
        Application
    ).filter(
        Application.company_profile_id ==
        company_profile.id
    ).all()

    results = []

    for application in applications:

        driver_profile = db.query(
            DriverProfile
        ).filter(
            DriverProfile.id ==
            application.driver_profile_id
        ).first()

        job = db.query(
            JobPost
        ).filter(
            JobPost.id ==
            application.job_post_id
        ).first()

        results.append({

            "application_id":
                application.id,

            "driver_name":
                driver_profile.full_name,

            "experience":
                driver_profile.experience_years,

            "license":
                driver_profile.license_category,

            "job_title":
                job.title,

            "status":
                application.status
        })

    db.close()

    return results
@router.put(
    "/application/{application_id}/status"
)
def update_application_status(

        application_id: int,

        status: str,

        current_user=Depends(
            require_company
        )
):

    db: Session = SessionLocal()

    application = db.query(
        Application
    ).filter(
        Application.id == application_id
    ).first()

    if not application:

        db.close()

        return {
            "error":
                "Application not found"
        }

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

    if (
        application.company_profile_id !=
        company_profile.id
    ):

        db.close()

        return {
            "error":
                "Unauthorized"
        }

    if status not in [
        "accepted",
        "rejected"
    ]:

        db.close()

        return {
            "error":
                "Invalid status"
        }

    application.status = status

    db.commit()

    db.refresh(application)

    db.close()

    return {
        "message":
            "Application updated",
        "new_status":
            application.status
    }
@router.put("/applications/{application_id}/accept")
def accept_application(
        application_id: int,
        current_user=Depends(require_company)
):

    db: Session = SessionLocal()

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:

        db.close()

        return {
            "error": "Application not found"
        }

    application.status = "accepted"

    db.commit()

    db.refresh(application)

    db.close()

    return {
        "message": "Application accepted"
    }
@router.put("/applications/{application_id}/reject")
def reject_application(
        application_id: int,
        current_user=Depends(require_company)
):

    db: Session = SessionLocal()

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:

        db.close()

        return {
            "error": "Application not found"
        }

    application.status = "rejected"

    db.commit()

    db.refresh(application)

    db.close()

    return {
        "message": "Application rejected"
    }
@router.get("/driver/applications")
def get_driver_applications(

        current_user=Depends(
            require_driver
        )
):

    db: Session = SessionLocal()

    driver_profile = db.query(
        DriverProfile
    ).filter(
        DriverProfile.user_id ==
        current_user.id
    ).first()

    if not driver_profile:

        db.close()

        return []

    applications = db.query(
        Application
    ).filter(
        Application.driver_profile_id ==
        driver_profile.id
    ).all()

    results = []

    for application in applications:

        job = db.query(
            JobPost
        ).filter(
            JobPost.id ==
            application.job_post_id
        ).first()

        results.append({

            "id":
                application.id,

            "job_title":
                job.title,

            "status":
                application.status
        })

    db.close()

    return results