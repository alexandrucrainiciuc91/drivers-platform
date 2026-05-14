from sqlalchemy.orm import Session

from app.models.notification import (
    Notification
)


def create_notification(

        db: Session,

        user_id: int,

        text: str
):

    notification = Notification(

        user_id=user_id,

        text=text
    )

    db.add(notification)

    db.commit()

    db.refresh(notification)

    return notification