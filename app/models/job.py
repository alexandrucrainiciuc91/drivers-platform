from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from app.database.database import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String
    )

    salary = Column(
        String
    )

    location = Column(
        String
    )

    description = Column(
        String
    )

    is_active = Column(
        Boolean,
        default=True
    )

    company_id = Column(
        Integer,
        ForeignKey("users.id")
    )