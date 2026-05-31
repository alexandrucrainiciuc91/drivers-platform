import os

print("PORT =", os.getenv("PORT"))
from app.routes.auth_routes import (
    router as auth_router
)
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
from app.routes.payment_routes import (
    router as payment_router
)
from app.models.job import Job
from app.models.conversation import (
    Conversation
)
from app.routes.chat_routes import (
    router as chat_router
)
from app.models.message import (
    Message
)
from app.routes.load_routes import router as load_router
from app.routes.notification_routes import (
    router as notification_router
)
from fastapi.middleware.cors import CORSMiddleware
from app.models.load_application import LoadApplication
from app.routes.load_applications_routes import router as load_applications_router
from app.routes.load_routes import (
    router as load_router
)
app = FastAPI()
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "https://drivelink-rho.vercel.app",
        "https://drivelinkeed.com",
        "https://www.drivelinkeed.com",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
@app.on_event("startup")
async def startup_event():
    print("APP STARTED SUCCESSFULLY")

    @app.get("/health")
    async def health():
        return {"ok": True}
@app.get("/")
async def root():
    return {"status": "ok"}
from fastapi.middleware.cors import CORSMiddleware


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
app.include_router(
    chat_router
)
app.include_router(auth_router)
app.include_router(load_router)
app.include_router(
    load_applications_router
)
app.include_router(
    load_router
)

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