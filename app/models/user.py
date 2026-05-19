from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy import Boolean
from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, index=True)

    password = Column(String)

    role = Column(String)
    subscription_plan = Column(
        String,
        default="free"
    )

    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)