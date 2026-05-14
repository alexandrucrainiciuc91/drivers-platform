from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from app.database.database import Base


class SavedJob(Base):

    __tablename__ = "saved_jobs"

    id = Column(
        Integer,
        primary_key=True
    )

    driver_profile_id = Column(
        Integer,
        ForeignKey("driver_profiles.id")
    )

    job_post_id = Column(
        Integer,
        ForeignKey("job_posts.id")
    )