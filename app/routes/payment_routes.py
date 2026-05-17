from fastapi import APIRouter
import stripe
import os

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@router.get("/payment/test")
def payment_test():

    return {
        "message": "Stripe routes working"
    }