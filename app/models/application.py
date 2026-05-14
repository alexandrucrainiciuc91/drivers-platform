from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.database import Base


class Application(Base):

    __tablename__ = "applications"

    id = Column(
        Integer,
        primary_key=True
    )

    driver_profile_id = Column(
        Integer,
        ForeignKey("driver_profiles.id")
    )

    company_profile_id = Column(
        Integer,
        ForeignKey("company_profiles.id")
    )

    job_post_id = Column(
        Integer,
        ForeignKey("job_posts.id")
    )

    status = Column(
        String,
        default="pending"
    )