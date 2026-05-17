import os
import stripe

from dotenv import load_dotenv

# ============================================
# LOAD ENV
# ============================================

load_dotenv()

# ============================================
# STRIPE CONFIG
# ============================================

stripe.api_key = os.getenv(
    "STRIPE_SECRET_KEY"
)

WEBHOOK_SECRET = os.getenv(
    "STRIPE_WEBHOOK_SECRET"
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL"
)

# ============================================
# CREATE CHECKOUT SESSION
# ============================================

def create_checkout_session(
        price_id: str,
        user_id: int
):

    session = stripe.checkout.Session.create(

        payment_method_types=[
            "card"
        ],

        line_items=[
            {
                "price": price_id,
                "quantity": 1
            }
        ],

        mode="subscription",

        success_url=
            f"{FRONTEND_URL}/success",

        cancel_url=
            f"{FRONTEND_URL}/cancel",

        metadata={

            "user_id":
                str(user_id),

            "price_id":
                price_id
        }
    )

    return session.url