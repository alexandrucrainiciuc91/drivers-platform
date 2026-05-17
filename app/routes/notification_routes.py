from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.notification import (
    Notification
)

from app.auth.dependencies import (
    get_current_user
)

router = APIRouter()

# ============================================
# GET NOTIFICATIONS
# ============================================

@router.get("/notifications")
def get_notifications(

        current_user=Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    try:

        notifications = db.query(
            Notification
        ).filter(
            Notification.user_id ==
            current_user.id
        ).order_by(
            Notification.id.desc()
        ).all()

        results = []

        for notification in notifications:

            results.append({

                "id":
                    notification.id,

                "title":
                    notification.title,

                "message":
                    notification.message,

                "is_read":
                    notification.is_read
            })

        return results

    finally:

        db.close()

# ============================================
# MARK AS READ
# ============================================

@router.put(
    "/notifications/{notification_id}/read"
)
def mark_notification_as_read(

        notification_id: int,

        current_user=Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    try:

        notification = db.query(
            Notification
        ).filter(

            Notification.id ==
            notification_id,

            Notification.user_id ==
            current_user.id

        ).first()

        if not notification:

            return {
                "error":
                    "Notification not found"
            }

        notification.is_read = True

        db.commit()

        return {
            "success":
                True
        }

    finally:

        db.close()