import os
import resend

resend.api_key = os.getenv(
    "RESEND_API_KEY"
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL"
)

# ============================================
# VERIFY EMAIL
# ============================================

def send_verification_email(
    email: str,
    token: str
):

    verify_link = (
        f"https://drivers-platform-production.up.railway.app/verify-email/{token}"
    )

    try:

        resend.Emails.send({

            "from":
                "onboarding@resend.dev",

            "to":
                email,

            "subject":
                "Verify your Drivers Platform account",

            "html":
                f"""
                <h2>Verify your account</h2>

                <p>
                    Click below to activate your account
                </p>

                <a href="{verify_link}">
                    Verify Account
                </a>
                """
        })

    except Exception as e:

        print(
            "RESEND ERROR:",
            e
        )

        raise e