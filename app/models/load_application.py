from sqlalchemy import (

    Column,
    Integer,
    String,
    ForeignKey

)

from app.database.database import Base


class LoadApplication(Base):

    __tablename__ = "load_applications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    load_id = Column(
        Integer,
        ForeignKey("loads.id")
    )

    driver_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    message = Column(String)

    status = Column(
        String,
        default="pending"
    )