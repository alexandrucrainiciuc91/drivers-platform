from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Boolean
)

from app.database.database import Base


class JobPost(Base):

    __tablename__ = "job_posts"

    id = Column(
        Integer,
        primary_key=True
    )

    company_profile_id = Column(
        Integer,
        ForeignKey("company_profiles.id")
    )

    title = Column(String)

    description = Column(String)

    pickup_country = Column(String)

    delivery_country = Column(String)

    transport_type = Column(String)

    salary = Column(Integer)

    experience_required = Column(Integer)

    adr_required = Column(Boolean)

    status = Column(
        String,
        default="active"
    )

    truck_type = Column(String)