from fastapi import (
    APIRouter,
    Depends
)
from app.models.conversation import Conversation
from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)
from app.models.notification import (
    Notification
)

from app.models.user import (
    User
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

from app.models.saved_job import (
    SavedJob
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
                    "You already applied."
            }

        # FREE DRIVER LIMIT

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
                        "FREE_PLAN_LIMIT_REACHED"
                }

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
        # GET COMPANY PROFILE

        company_profile = db.query(
            CompanyProfile
        ).filter(
            CompanyProfile.id ==
            job.company_profile_id
        ).first()

        # SEND NOTIFICATION TO COMPANY

        if company_profile:
            notification = Notification(

                user_id=
                company_profile.user_id,

                title=
                "New Application",

                message=
                f"{driver_profile.full_name} applied to '{job.title}'",

                is_read=False
            )

            db.add(notification)

            db.commit()
        company_user_id = db.query(
            CompanyProfile
        ).filter(
            CompanyProfile.id ==
            job.company_profile_id
        ).first().user_id

        notification = Notification(

            user_id=
            company_user_id,

            title=
            "New Application",

            message=
            f"{driver_profile.full_name} applied to {job.title}"
        )

        db.add(notification)

        db.commit()
        return {

            "success":
                True,

            "application_id":
                new_application.id,

            "job_post_id":
                job.id
        }

    except Exception as e:

        print("APPLY ERROR:", e)

        return {
            "error":
                "SERVER_ERROR"
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

                "job_post_id":
                    application.job_post_id,

                "job_title":
                    job.title,

                "description":
                    job.description,

                "salary":
                    job.salary,

                "pickup_country":
                    job.pickup_country,

                "delivery_country":
                    job.delivery_country,

                "transport_type":
                    job.transport_type,

                "status":
                    application.status
            })

        return results

    except Exception as e:

        print("DRIVER APPLICATIONS ERROR:", e)

        return []

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

        applications_query = db.query(
            Application
        ).filter(
            Application.company_profile_id ==
            company_profile.id
        )

        # FREE COMPANY LIMIT

        if (
            current_user.subscription_plan ==
            "free"
        ):

            applications = applications_query.limit(5).all()

        else:

            applications = applications_query.all()

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

            if not driver_profile:
                continue

            if not job:
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

                "job_id":
                    job.id,

                "status":
                    application.status
            })

        return results

    except Exception as e:

        print("COMPANY APPLICATIONS ERROR:", e)

        return []

    finally:

        db.close()

# ============================================
# UPDATE APPLICATION STATUS
# ============================================

# ============================================
# UPDATE APPLICATION STATUS
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
            Application.id ==
            application_id
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

        # UPDATE STATUS

        application.status = status

        # GET DRIVER

        driver_profile = db.query(
            DriverProfile
        ).filter(
            DriverProfile.id ==
            application.driver_profile_id
        ).first()

        # GET JOB

        job = db.query(
            JobPost
        ).filter(
            JobPost.id ==
            application.job_post_id
        ).first()

        # NOTIFICATIONS

        if driver_profile and job:

            if status == "accepted":

                notification = Notification(

                    user_id=
                        driver_profile.user_id,

                    title=
                        "Application Accepted",

                    message=
                        f"Your application for '{job.title}' was accepted.",

                    is_read=False
                )

                db.add(notification)

            elif status == "rejected":

                notification = Notification(

                    user_id=
                        driver_profile.user_id,

                    title=
                        "Application Rejected",

                    message=
                        f"Your application for '{job.title}' was rejected.",

                    is_read=False
                )

                db.add(notification)

        # CREATE CONVERSATION
        # ONLY FOR ACCEPTED

        if (
            status == "accepted" and
            driver_profile
        ):

            existing_conversation = db.query(
                Conversation
            ).filter(
                Conversation.application_id ==
                application.id
            ).first()

            if not existing_conversation:

                conversation = Conversation(

                    driver_user_id=
                        driver_profile.user_id,

                    company_user_id=
                        current_user.id,

                    application_id=
                        application.id
                )

                db.add(conversation)

        db.commit()

        db.refresh(application)

        return {

            "message":
                "Application updated",

            "new_status":
                application.status
        }

    except Exception as e:

        print("UPDATE STATUS ERROR:", e)

        return {
            "error":
                "SERVER_ERROR"
        }

    finally:

        db.close()

# ============================================
# SAVE JOB
# ============================================

@router.post("/save-job/{job_id}")
def save_job(

        job_id: int,

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

        existing = db.query(
            SavedJob
        ).filter(

            SavedJob.driver_profile_id ==
            driver_profile.id,

            SavedJob.job_post_id ==
            job_id

        ).first()

        if existing:

            return {
                "error":
                    "JOB_ALREADY_SAVED"
            }

        saved_job = SavedJob(

            driver_profile_id=
                driver_profile.id,

            job_post_id=
                job_id
        )

        db.add(saved_job)

        db.commit()

        return {
            "message":
                "Job saved"
        }

    except Exception as e:

        print("SAVE JOB ERROR:", e)

        return {
            "error":
                "SERVER_ERROR"
        }

    finally:

        db.close()

# ============================================
# GET SAVED JOBS
# ============================================

@router.get("/saved-jobs")
def get_saved_jobs(

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

        saved_jobs = db.query(
            SavedJob
        ).filter(
            SavedJob.driver_profile_id ==
            driver_profile.id
        ).all()

        results = []

        for saved in saved_jobs:

            job = db.query(
                JobPost
            ).filter(
                JobPost.id ==
                saved.job_post_id
            ).first()

            if not job:
                continue

            results.append({

                "saved_id":
                    saved.id,

                "job_id":
                    job.id,

                "title":
                    job.title,

                "description":
                    job.description,

                "salary":
                    job.salary,

                "pickup_country":
                    job.pickup_country,

                "delivery_country":
                    job.delivery_country,

                "transport_type":
                    job.transport_type
            })

        return results

    except Exception as e:

        print("GET SAVED JOBS ERROR:", e)

        return []

    finally:

        db.close()

# ============================================
# REMOVE SAVED JOB
# ============================================

@router.delete("/saved-job/{job_id}")
def remove_saved_job(

        job_id: int,

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

        saved_job = db.query(
            SavedJob
        ).filter(

            SavedJob.driver_profile_id ==
            driver_profile.id,

            SavedJob.job_post_id ==
            job_id

        ).first()

        if not saved_job:

            return {
                "error":
                    "Saved job not found"
            }

        db.delete(saved_job)

        db.commit()

        return {
            "message":
                "Saved job removed"
        }

    except Exception as e:

        print("REMOVE SAVED JOB ERROR:", e)

        return {
            "error":
                "SERVER_ERROR"
        }

    finally:

        db.close()