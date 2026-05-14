from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.database import Base


class CompanyProfile(Base):

    __tablename__ = "company_profiles"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    company_name = Column(String)

    country = Column(String)

    city = Column(String)

    fleet_size = Column(Integer)

    transport_type = Column(String)

    website = Column(String)

    phone = Column(String)

    description = Column(String)