"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function VerifyEmailPage() {

    const params = useParams();

    const token = params.token;

    const [message, setMessage] = useState(
        "Verifying your email..."
    );

    useEffect(() => {

        async function verifyEmail() {

            try {

                const response = await fetch(

                    `https://drivers-platform-production.up.railway.app/verify-email/${token}`
                );

                const data = await response.json();

                if (response.ok) {

                    setMessage(
                        "Email verified successfully!"
                    );

                } else {

                    setMessage(
                        data.detail || "Verification failed"
                    );
                }

            } catch {

                setMessage(
                    "Server error"
                );
            }
        }

        if (token) {

            verifyEmail();
        }

    }, [token]);

    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-black
                text-white
                text-3xl
            "
        >
            {message}
        </div>
    );
}