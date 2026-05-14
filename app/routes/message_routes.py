from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.message import (
    Message
)

from app.schemas.message_schema import (
    MessageCreate
)

from app.auth.dependencies import (
    get_current_user
)
from app.services.notification_service import (
    create_notification
)
router = APIRouter()


@router.post("/send-message")
def send_message(

        message: MessageCreate,

        current_user = Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    new_message = Message(

        sender_id=current_user.id,

        receiver_id=message.receiver_id,

        content=message.content
    )

    db.add(new_message)

    db.commit()
    create_notification(

        db=db,

        user_id=message.receiver_id,

        text="You received a new message"
    )

    db.refresh(new_message)

    db.close()

    return {
        "message":
            "Message sent"
    }
@router.get("/messages")
def get_messages(

        current_user = Depends(
            get_current_user
        )
):

    db: Session = SessionLocal()

    messages = db.query(
        Message
    ).filter(

        Message.receiver_id ==
        current_user.id

    ).all()

    results = []

    for message in messages:

        results.append({

            "from_user_id":
                message.sender_id,

            "content":
                message.content
        })

    db.close()

    return results