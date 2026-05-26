from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)
from app.auth.dependencies import (
    require_company,
    get_current_user
)
from app.models.job_post import (
    JobPost
)

from app.models.company_profile import (
    CompanyProfile
)

from app.schemas.job_post_schema import (
    JobPostCreate
)

from app.auth.dependencies import (
    require_company
)
from app.models.application import (
    Application
)
router = APIRouter()


@router.post("/job-post")
def create_job_post(

        job: JobPostCreate,

        current_user = Depends(
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
    # ============================================
    # FREE PLAN LIMIT
    # ============================================

    if current_user.subscription_plan == "free":

        jobs_count = db.query(
            JobPost
        ).filter(
            JobPost.company_profile_id ==
            company_profile.id
        ).count()

        if jobs_count >= 5:

            db.close()

            return {
                "error":
                    "FREE_PLAN_LIMIT_REACHED",
                "message":
                    "Upgrade to BUSINESS to post unlimited jobs."
            }
    new_job = JobPost(

        company_profile_id=
        company_profile.id,

        title=job.title,

        description=job.description,

        pickup_country=
        job.pickup_country,

        delivery_country=
        job.delivery_country,

        transport_type=
        job.transport_type,

        salary=job.salary,

        experience_required=
        job.experience_required,

        adr_required=
        job.adr_required,

        truck_type=
        job.truck_type
    )

    db.add(new_job)

    db.commit()

    db.refresh(new_job)

    db.close()

    return {
        "message":
            "Job created",
        "job_id":
            new_job.id
    }
@router.get("/jobs")
def get_jobs(

        current_user=Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    jobs = db.query(
        JobPost
    ).all()

    # ============================================
    # FREE DRIVER LIMIT
    # ============================================

    if (
        current_user.role == "driver"
        and
        current_user.subscription_plan == "free"
    ):

        jobs = jobs[:3]

    db.close()

    return jobs
@router.get("/jobs/search")
def search_jobs(

        country: str = None,

        transport_type: str = None,

        min_salary: int = None
):

    db: Session = SessionLocal()

    query = db.query(JobPost)

    if country:

        query = query.filter(
            JobPost.country == country
        )

    if transport_type:

        query = query.filter(
            JobPost.transport_type ==
            transport_type
        )

    if min_salary:

        query = query.filter(
            JobPost.salary >= min_salary
        )

    results = query.all()

    db.close()

    return results
@router.get("/company/jobs")
def get_company_jobs(

        current_user = Depends(
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

        return []

    jobs = db.query(
        JobPost
    ).filter(
        JobPost.company_profile_id ==
        company_profile.id
    ).all()

    db.close()

    return jobs

@router.delete("/job-post/{job_id}")
def delete_job_post(

        job_id: int,

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

    job = db.query(
        JobPost
    ).filter(

        JobPost.id == job_id,

        JobPost.company_profile_id ==
        company_profile.id

    ).first()

    if not job:

        db.close()

        return {
            "error":
                "Job not found"
        }
    # DELETE APPLICATIONS FIRST

    applications = db.query(
        Application
    ).filter(
        Application.job_post_id ==
        job.id
    ).all()

    for application in applications:
        db.delete(application)
    db.delete(job)

    db.commit()

    db.close()

    return {
        "message":
            "Job deleted"
    }