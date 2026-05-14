from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.application import (
    Application
)

from app.models.company_profile import (
    CompanyProfile
)

from app.models.driver_profile import (
    DriverProfile
)

from app.models.job_post import (
    JobPost
)

from app.auth.dependencies import (
    require_driver,
    require_company
)

router = APIRouter()

# ============================================
# APPLY TO JOB
# ============================================

@router.post("/apply-job/{job_id}")
def apply_to_job(

        job_id: int,

        current_user=Depends(
            require_driver
        )
):

    db: Session = SessionLocal()

    try:

        # DRIVER PROFILE

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

        # JOB

        job = db.query(
            JobPost
        ).filter(
            JobPost.id == job_id
        ).first()

        if not job:

            return {
                "error":
                    "Job not found"
            }

        # ============================================
        # CHECK IF ALREADY APPLIED
        # ============================================

        existing_application = db.query(
            Application
        ).filter(
            Application.driver_profile_id ==
            driver_profile.id,

            Application.job_post_id ==
            job.id
        ).first()

        if existing_application:

            return {
                "error":
                    "ALREADY_APPLIED",

                "message":
                    "You already applied to this job."
            }

        # ============================================
        # FREE PLAN LIMIT
        # ============================================

        if (
            current_user.subscription_plan ==
            "free"
        ):

            applications_count = db.query(
                Application
            ).filter(
                Application.driver_profile_id ==
                driver_profile.id
            ).count()

            if applications_count >= 3:

                return {
                    "error":
                        "FREE_PLAN_LIMIT_REACHED",

                    "message":
                        "Upgrade to PRO DRIVER to apply to unlimited jobs."
                }

        # ============================================
        # CREATE APPLICATION
        # ============================================

        new_application = Application(

            driver_profile_id=
                driver_profile.id,

            company_profile_id=
                job.company_profile_id,

            job_post_id=
                job.id,

            status="pending"
        )

        db.add(new_application)

        db.commit()

        db.refresh(new_application)

        return {

            "message":
                "Applied successfully",

            "application_id":
                new_application.id
        }

    finally:

        db.close()

# ============================================
# DRIVER APPLICATIONS
# ============================================

@router.get("/driver/applications")
def get_driver_applications(

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

            if not job:
                continue

            results.append({

                "id":
                    application.id,

                "job_id":
                    job.id,

                "job_title":
                    job.title,

                "status":
                    application.status
            })

        return results

    finally:

        db.close()

# ============================================
# COMPANY APPLICATIONS
# ============================================

@router.get("/company/applications")
def get_company_applications(

        current_user=Depends(
            require_company
        )
):

    db: Session = SessionLocal()

    try:

        company_profile = db.query(
            CompanyProfile
        ).filter(
            CompanyProfile.user_id ==
            current_user.id
        ).first()

        if not company_profile:

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

            if not driver_profile or not job:
                continue

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

        return results

    finally:

        db.close()

# ============================================
# UPDATE STATUS
# ============================================

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

    try:

        application = db.query(
            Application
        ).filter(
            Application.id == application_id
        ).first()

        if not application:

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

            return {
                "error":
                    "Company profile not found"
            }

        if (
            application.company_profile_id !=
            company_profile.id
        ):

            return {
                "error":
                    "Unauthorized"
            }

        if status not in [
            "accepted",
            "rejected",
            "pending"
        ]:

            return {
                "error":
                    "Invalid status"
            }

        application.status = status

        db.commit()

        db.refresh(application)

        return {

            "message":
                "Application updated",

            "new_status":
                application.status
        }

    finally:

        db.close()

# ============================================
# ACCEPT APPLICATION
# ============================================

@router.put("/applications/{application_id}/accept")
def accept_application(

        application_id: int,

        current_user=Depends(
            require_company
        )
):

    db: Session = SessionLocal()

    try:

        application = db.query(
            Application
        ).filter(
            Application.id == application_id
        ).first()

        if not application:

            return {
                "error":
                    "Application not found"
            }

        application.status = "accepted"

        db.commit()

        db.refresh(application)

        return {
            "message":
                "Application accepted"
        }

    finally:

        db.close()

# ============================================
# REJECT APPLICATION
# ============================================

@router.put("/applications/{application_id}/reject")
def reject_application(

        application_id: int,

        current_user=Depends(
            require_company
        )
):

    db: Session = SessionLocal()

    try:

        application = db.query(
            Application
        ).filter(
            Application.id == application_id
        ).first()

        if not application:

            return {
                "error":
                    "Application not found"
            }

        application.status = "rejected"

        db.commit()

        db.refresh(application)

        return {
            "message":
                "Application rejected"
        }

    finally:

        db.close()