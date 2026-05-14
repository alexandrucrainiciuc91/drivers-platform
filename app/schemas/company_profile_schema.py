from pydantic import BaseModel


class CompanyProfileCreate(BaseModel):

    company_name: str

    country: str

    city: str

    fleet_size: int

    transport_type: str

    website: str

    phone: str

    description: str