from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Boolean
)

from app.database.database import Base


class DriverProfile(Base):

    __tablename__ = "driver_profiles"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    full_name = Column(String)

    city = Column(String)

    experience_years = Column(Integer)

    has_adr = Column(
        Boolean,
        default=False
    )

    preferred_country = Column(String)

    desired_salary = Column(Integer)

    transport_type = Column(String)

    license_category = Column(String)

    preferred_countries = Column(String)

    adr_certificate = Column(String)

    availability = Column(String)

    phone = Column(String)

    about = Column(String)

    profile_photo = Column(
        String,
        nullable=True
    )

    driver_license_photo = Column(
        String,
        nullable=True
    )

    adr_certificate_photo = Column(
        String,
        nullable=True
    )