from pydantic import (
    BaseModel
)

from typing import Literal


# =====================================================
# REGISTER
# =====================================================

class UserCreate(BaseModel):

    email: str

    password: str

    role: Literal[
        "driver",
        "company"
    ]

    subscription_plan: Literal[
        "free",
        "pro",
        "business"
    ] = "free"


# =====================================================
# LOGIN
# =====================================================

class UserLogin(BaseModel):

    email: str

    password: str