from pydantic import BaseModel


class JobPostCreate(BaseModel):

    title: str

    description: str

    pickup_country: str

    delivery_country: str

    transport_type: str

    salary: int

    experience_required: int

    adr_required: bool

    truck_type: str