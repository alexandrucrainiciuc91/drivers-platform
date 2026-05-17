from fastapi import (
    APIRouter,
    Depends,
    Request
)

from pydantic import BaseModel

from sqlalchemy.orm import Session

import stripe

from app.database.database import (
    SessionLocal
)

from app.models.user import (
    User
)

from app.auth.dependencies import (
    get_current_user
)

from app.services.stripe_service import (
    create_checkout_session
)

router = APIRouter()


# ============================================
# STRIPE SECRET
# ============================================
import os
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

# ============================================
# REQUEST MODEL
# ============================================

class SubscribeRequest(BaseModel):

    price_id: str


# ============================================
# SUBSCRIBE
# ============================================

@router.post("/subscribe")
def subscribe(

    request: SubscribeRequest,

    current_user = Depends(
        get_current_user
    )
):

    checkout_url = create_checkout_session(

        request.price_id,

        current_user.id
    )

    return {

        "checkout_url":
            checkout_url
    }


# ============================================
# STRIPE WEBHOOK
# ============================================

@router.post("/webhook")
async def stripe_webhook(
    request: Request
):

    payload = await request.body()

    sig_header = request.headers.get(
        "stripe-signature"
    )

    try:

        event = stripe.Webhook.construct_event(

            payload,

            sig_header,

            endpoint_secret
        )

    except Exception as e:

        return {
            "error": str(e)
        }

    # ============================================
    # PAYMENT SUCCESS
    # ============================================

    if event["type"] == "checkout.session.completed":

        session = event["data"]["object"]

        user_id = session["metadata"]["user_id"]

        price_id = (
            session["metadata"]["price_id"]
        )

        db: Session = SessionLocal()

        user = db.query(User).filter(
            User.id == int(user_id)
        ).first()

        if user:

            # DRIVER

            if price_id == "price_1TVGXaEKIOywtjGZSQvQxhOF":

                user.subscription_plan = "pro"

            # COMPANY

            elif price_id == "price_1TWXnjEKIOywtjGZrBPeI3ek":

                user.subscription_plan = "business"

            db.commit()

        db.close()

    return {
        "status": "success"
    }