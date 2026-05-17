from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
Depends
)
from app.auth.dependencies import (
    get_current_user
)
from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.message import (
    Message
)

from app.models.conversation import (
    Conversation
)

from app.models.notification import (
    Notification
)

from app.websockets.chat_manager import (
    manager
)
from app.models.notification import Notification

from app.auth.dependencies import (
    get_current_user
)
router = APIRouter()

# ============================================
# GET CONVERSATIONS
# ============================================

@router.get("/conversations/{user_id}")
def get_conversations(user_id: int):

    db: Session = SessionLocal()

    try:

        conversations = db.query(
            Conversation
        ).filter(

            (Conversation.driver_user_id == user_id) |

            (Conversation.company_user_id == user_id)

        ).all()

        results = []

        for conversation in conversations:

            last_message = db.query(
                Message
            ).filter(
                Message.conversation_id ==
                conversation.id
            ).order_by(
                Message.id.desc()
            ).first()

            unread_count = db.query(
                Message
            ).filter(

                Message.conversation_id ==
                conversation.id,

                Message.sender_user_id !=
                user_id,

                Message.is_read == False

            ).count()

            results.append({

                "id":
                    conversation.id,

                "application_id":
                    conversation.application_id,

                "driver_user_id":
                    conversation.driver_user_id,

                "company_user_id":
                    conversation.company_user_id,

                "last_message":
                    last_message.content
                    if last_message else "",

                "unread_count":
                    unread_count
            })

        return results

    finally:

        db.close()

# ============================================
# GET MESSAGES
# ============================================

@router.get("/messages/{conversation_id}")
def get_messages(conversation_id: int):

    db: Session = SessionLocal()

    try:

        messages = db.query(
            Message
        ).filter(
            Message.conversation_id ==
            conversation_id
        ).all()

        results = []

        for message in messages:

            results.append({

                "id":
                    message.id,

                "sender_user_id":
                    message.sender_user_id,

                "content":
                    message.content,

                "is_read":
                    message.is_read
            })

        return results

    finally:

        db.close()

# ============================================
# MARK MESSAGES AS READ
# ============================================

@router.put(
    "/messages/{conversation_id}/read"
)
def mark_messages_as_read(
    conversation_id: int
):

    db: Session = SessionLocal()

    try:

        messages = db.query(
            Message
        ).filter(
            Message.conversation_id ==
            conversation_id,

            Message.is_read == False
        ).all()

        for message in messages:

            message.is_read = True

        db.commit()

        return {
            "message":
                "Messages marked as read"
        }

    finally:

        db.close()

# ============================================
# WEBSOCKET CHAT
# ============================================
@router.websocket("/ws/chat/{conversation_id}")
async def websocket_chat(

        websocket: WebSocket,

        conversation_id: int
):

    await manager.connect(
        conversation_id,
        websocket
    )

    db: Session = SessionLocal()

    try:

        while True:

            data = await websocket.receive_json()

            # ============================================
            # CREATE MESSAGE
            # ============================================

            message = Message(

                conversation_id=
                    conversation_id,

                sender_user_id=
                    data["sender_user_id"],

                content=
                    data["content"],

                is_read=False
            )

            db.add(message)

            db.commit()

            db.refresh(message)

            # ============================================
            # GET CONVERSATION
            # ============================================

            conversation = db.query(
                Conversation
            ).filter(
                Conversation.id ==
                conversation_id
            ).first()

            receiver_id = None

            if conversation:

                # DRIVER SENT

                if (
                    conversation.driver_user_id ==
                    data["sender_user_id"]
                ):

                    receiver_id = (
                        conversation.company_user_id
                    )

                # COMPANY SENT

                else:

                    receiver_id = (
                        conversation.driver_user_id
                    )

            # ============================================
            # CREATE NOTIFICATION
            # ============================================

            if receiver_id:

                notification = Notification(

                    user_id=
                        receiver_id,

                    title=
                        "New Message",

                    message=
                        data["content"],

                    is_read=False
                )

                db.add(notification)

                db.commit()

                db.refresh(notification)

                print(
                    "NOTIFICATION CREATED"
                )

            # ============================================
            # SEND REALTIME MESSAGE
            # ============================================

            await manager.send_message(

                conversation_id,

                {

                    "id":
                        message.id,

                    "sender_user_id":
                        message.sender_user_id,

                    "content":
                        message.content,

                    "is_read":
                        message.is_read
                }
            )

    except WebSocketDisconnect:

        manager.disconnect(
            conversation_id,
            websocket
        )

    finally:

        db.close()

        # ============================================
        # MARK MESSAGES AS READ
        # ============================================

        @router.put("/messages/{conversation_id}/read")
        def mark_messages_as_read(

                conversation_id: int,

                current_user=Depends(
                    get_current_user
                )
        ):

            db: Session = SessionLocal()

            try:

                messages = db.query(
                    Message
                ).filter(

                    Message.conversation_id ==
                    conversation_id,

                    Message.sender_user_id !=
                    current_user.id,

                    Message.is_read == False

                ).all()

                for message in messages:
                    message.is_read = True

                db.commit()

                return {
                    "message":
                        "Messages marked as read"
                }

            finally:

                db.close()