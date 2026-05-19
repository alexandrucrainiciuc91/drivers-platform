import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")

FRONTEND_URL = os.getenv("FRONTEND_URL")


def send_verification_email(email: str, token: str):

    verify_link = (
        f"{FRONTEND_URL}/verify-email?token={token}"
    )

    resend.Emails.send({

        "from": "Drivers Platform <onboarding@resend.dev>",

        "to": email,

        "subject": "Verify your Drivers Platform account",

        "html": f"""
        <h2>Verify your account</h2>

        <p>
            Click below to activate your account
        </p>

        <a href="{verify_link}">
            Verify Account
        </a>
        """
    })


def send_reset_password_email(
    email: str,
    token: str
):

    reset_link = (
        f"{FRONTEND_URL}/reset-password?token={token}"
    )

    resend.Emails.send({

        "from": "Drivers Platform <onboarding@resend.dev>",

        "to": email,

        "subject": "Reset your password",

        "html": f"""
        <h2>Password Reset</h2>

        <p>
            Click below to reset password
        </p>

        <a href="{reset_link}">
            Reset Password
        </a>
        """
    })