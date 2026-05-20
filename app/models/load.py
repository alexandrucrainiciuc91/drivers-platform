from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.database import Base


class Load(Base):

    __tablename__ = "loads"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    company_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    pickup_country = Column(
        String
    )

    pickup_city = Column(
        String
    )

    delivery_country = Column(
        String
    )

    delivery_city = Column(
        String
    )

    distance_km = Column(
        Integer
    )

    price = Column(
        Integer
    )

    transport_type = Column(
        String
    )

    cargo_type = Column(
        String
    )

    total_weight = Column(
        String
    )

    special_requirements = Column(
        String
    )

    loading_date = Column(
        String
    )

    phone = Column(
        String
    )

    status = Column(
        String,
        default="available"
    )