from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from app.database.database import Base


class Conversation(Base):

    __tablename__ = "conversations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    driver_user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    company_user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    application_id = Column(
        Integer,
        ForeignKey("applications.id")
    )