from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.saved_job import (
    SavedJob
)

from app.models.driver_profile import (
    DriverProfile
)

from app.models.job_post import (
    JobPost
)

from app.auth.dependencies import (
    require_driver
)
from app.models.driver_profile import DriverProfile

router = APIRouter()


@router.post("/save-job/{job_id}")
def save_job(

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

    if not job:

        db.close()

        return {
            "error":
                "Job not found"
        }

    existing_saved = db.query(
        SavedJob
    ).filter(

        SavedJob.driver_profile_id ==
        driver_profile.id,

        SavedJob.job_post_id ==
        job.id

    ).first()

    if existing_saved:

        db.close()

        return {
            "message":
                "Job already saved"
        }

    saved_job = SavedJob(

        driver_profile_id =
            driver_profile.id,

        job_post_id =
            job.id
    )

    db.add(saved_job)

    db.commit()

    db.refresh(saved_job)

    db.close()

    return {
        "message":
            "Job saved"
    }
@router.get("/saved-jobs")
def get_saved_jobs(

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

        results.append({

            "job_id":
                job.id,

            "title":
                job.title,

            "country":
                job.country,

            "salary":
                job.salary
        })

    db.close()

    return results
@router.post("/save-job/{job_id}")
def save_job(

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

    saved_job = SavedJob(

        driver_profile_id=
            driver_profile.id,

        job_post_id=job_id
    )

    db.add(saved_job)

    db.commit()

    db.refresh(saved_job)

    db.close()

    return {
        "message":
            "Job saved"
    }