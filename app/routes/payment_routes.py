from fastapi import (
    APIRouter,
    Depends,
    Request,
    HTTPException
)

from pydantic import BaseModel

from sqlalchemy.orm import Session

import stripe
import os

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

# =====================================================
# DATABASE
# =====================================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# =====================================================
# STRIPE
# =====================================================

stripe.api_key = os.getenv(
    "STRIPE_SECRET_KEY"
)

endpoint_secret = os.getenv(
    "STRIPE_WEBHOOK_SECRET"
)

# =====================================================
# REQUEST MODEL
# =====================================================

class SubscribeRequest(BaseModel):

    price_id: str

# =====================================================
# SUBSCRIBE
# =====================================================

@router.post("/subscribe")
def subscribe(

    request: SubscribeRequest,

    current_user: User = Depends(
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

# =====================================================
# CANCEL SUBSCRIPTION
# =====================================================

@router.post(
    "/cancel-subscription"
)

def cancel_subscription(

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )
):

    if not current_user.stripe_subscription_id:

        raise HTTPException(

            status_code=400,

            detail=
            "No active subscription"
        )

    stripe.Subscription.delete(

        current_user
        .stripe_subscription_id
    )

    current_user.subscription_plan = (
        "free"
    )

    current_user.stripe_subscription_id = (
        None
    )

    db.commit()

    return {

        "message":
            "Subscription canceled"
    }

# =====================================================
# STRIPE WEBHOOK
# =====================================================

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

    # =================================================
    # CHECKOUT SUCCESS
    # =================================================

    if event["type"] == "checkout.session.completed":

        session = event["data"]["object"]

        user_id = session["metadata"]["user_id"]

        price_id = (
            session["metadata"]["price_id"]
        )

        subscription_id = (
            session["subscription"]
        )

        db: Session = SessionLocal()

        user = db.query(User).filter(
            User.id == int(user_id)
        ).first()

        if user:

            # SAVE SUBSCRIPTION ID

            user.stripe_subscription_id = (
                subscription_id
            )

            # DRIVER PLAN

            if price_id == "price_1TfPFN2QvH8zDoe0hzQxgqBe":

                user.subscription_plan = (
                    "pro"
                )

            # COMPANY PLAN

            elif price_id == "price_1TfPFL2QvH8zDoe0flwqlbBU":

                user.subscription_plan = (
                    "business"
                )

            db.commit()

        db.close()

    # =================================================
    # SUBSCRIPTION CANCELED
    # =================================================

    if event["type"] == "customer.subscription.deleted":

        subscription = event["data"]["object"]

        subscription_id = subscription["id"]

        db: Session = SessionLocal()

        user = db.query(User).filter(

            User.stripe_subscription_id ==
            subscription_id

        ).first()

        if user:

            user.subscription_plan = (
                "free"
            )

            user.stripe_subscription_id = (
                None
            )

            db.commit()

        db.close()

    return {
        "status": "success"
    }