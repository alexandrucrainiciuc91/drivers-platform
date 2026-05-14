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


@router.get("/notifications")
def get_notifications(

        current_user = Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    notifications = db.query(
        Notification
    ).filter(
        Notification.user_id ==
        current_user.id
    ).all()

    db.close()

    return notifications