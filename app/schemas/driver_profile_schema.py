from pydantic import BaseModel


class DriverProfileCreate(BaseModel):

    full_name: str

    city: str

    experience_years: int

    license_category: str

    preferred_countries: str

    adr_certificate: str

    availability: str

    phone: str

    about: str
    
    profile_photo: str | None = None

    driver_license_photo: str | None = None

    adr_certificate_photo: str | None = None