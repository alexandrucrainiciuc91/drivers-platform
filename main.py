from fastapi import FastAPI
from app.models.company_profile import CompanyProfile
from app.database.database import engine, Base
from app.routes.driver_profile_routes import (
    router as driver_profile_router
)
from app.models.application import (
    Application
)
from app.models.user import User
from app.models.driver_profile import DriverProfile
from app.routes.company_profile_routes import (
    router as company_profile_router
)
from app.routes.user_routes import router as user_router
from app.routes.application_routes import (
    router as application_router
)
from app.models.message import Message
from app.routes.message_routes import (
    router as message_router
)
from app.models.job_post import JobPost
from app.routes.job_post_routes import (
    router as job_post_router
)
from app.models.saved_job import (
    SavedJob
)
from app.routes.saved_job_routes import (
    router as saved_job_router
)
from app.models.notification import (
    Notification
)
from app.routes.notification_routes import (
    router as notification_router
)
from app.routes.payment_routes import (
    router as payment_router
)
from app.models.job import Job
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.137:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(driver_profile_router)
app.include_router(company_profile_router)
app.include_router(application_router)
app.include_router(message_router)
app.include_router(job_post_router)
app.include_router(saved_job_router)
app.include_router(notification_router)
app.include_router(payment_router)


@app.get("/")
def home():
    return {
        "message": "Drivers Platform API is running"
    }
@app.get("/company/stats")
def get_company_stats():

    return {
        "drivers": 12,
        "loads": 5,
        "revenue": 24000
    }
@app.get("/company/loads")
def company_loads():

    return [

        {
            "id": 1,
            "pickup": "Bucharest",
            "delivery": "Berlin",
            "driver": "John Doe",
            "status": "In Transit"
        },

        {
            "id": 2,
            "pickup": "Pitesti",
            "delivery": "Paris",
            "driver": "Mike Smith",
            "status": "Delivered"
        },

        {
            "id": 3,
            "pickup": "Madrid",
            "delivery": "Rome",
            "driver": "Alex Driver",
            "status": "Loading"
        }
    ]