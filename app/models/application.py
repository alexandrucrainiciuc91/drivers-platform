from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from datetime import datetime

from app.database.database import Base


class Application(Base):

    __tablename__ = "applications"

    # ============================================
    # ID
    # ============================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ============================================
    # RELATIONS
    # ============================================

    driver_profile_id = Column(
        Integer,
        ForeignKey("driver_profiles.id"),
        nullable=False
    )

    company_profile_id = Column(
        Integer,
        ForeignKey("company_profiles.id"),
        nullable=False
    )

    job_post_id = Column(
        Integer,
        ForeignKey("job_posts.id"),
        nullable=False
    )

    # ============================================
    # STATUS
    # ============================================

    status = Column(
        String,
        default="pending"
    )

    # ============================================
    # CREATED AT
    # ============================================

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )