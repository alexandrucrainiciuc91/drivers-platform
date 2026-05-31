"use client";

import {
    useEffect,
    useState
} from "react";

import {
    useRouter,
    useParams
} from "next/navigation";

import Link from "next/link";

export default function ChatPage() {

    const params = useParams();

    const router = useRouter();

    const conversationId =
        params.id;

    const [messages, setMessages] =
        useState<any[]>([]);

    const [content, setContent] =
        useState("");

    const [socket, setSocket] =
        useState<WebSocket | null>(null);

    // ============================================
    // LOAD
    // ============================================

    useEffect(() => {

        fetchMessages();

        markMessagesAsRead();

        connectWebSocket();

    }, []);

    // ============================================
    // FETCH MESSAGES
    // ============================================

    async function fetchMessages() {

        try {

            const response =
                await fetch(
                    `https://drivers-platform-production.up.railway.app/messages/${conversationId}`
                );

            const data =
                await response.json();

            setMessages(data);

        } catch (error) {

            console.log(error);
        }
    }

    // ============================================
    // MARK AS READ
    // ============================================

    async function markMessagesAsRead() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await fetch(

                `https://drivers-platform-production.up.railway.app/messages/${conversationId}/read`,

                {
                    method: "PUT",

                    headers: {

                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            router.refresh();

        } catch (error) {

            console.log(error);
        }
    }

    // ============================================
    // CONNECT WEBSOCKET
    // ============================================

    function connectWebSocket() {

        const ws =
            new WebSocket(`wss://drivers-platform-production.up.railway.app/ws/chat/${conversationId}`
);

        ws.onopen = () => {

            console.log(
                "CONNECTED TO CHAT"
            );
        };

        ws.onmessage = (event) => {

            const data =
                JSON.parse(
                    event.data
                );

            setMessages((prev) => {

                const exists =
                    prev.some(
                        (msg) =>
                            msg.id === data.id
                    );

                if (exists) {

                    return prev;
                }

                return [

                    ...prev,

                    data
                ];
            });
        };

        ws.onclose = () => {

            console.log(
                "CHAT CLOSED"
            );
        };

        setSocket(ws);
    }

    // ============================================
    // SEND MESSAGE
    // ============================================

    function sendMessage() {

        if (
            !content.trim()
        ) return;

        if (!socket) return;

        const userId =
            localStorage.getItem(
                "user_id"
            );

        socket.send(
            JSON.stringify({

                sender_user_id:
                    Number(userId),

                content:
                    content
            })
        );

        setContent("");
    }

    // ============================================
    // UI
    // ============================================

    return (

        <div className="min-h-screen bg-black text-white p-5 md:p-4 md:p-8 xl:p-10">

            {/* BACK */}

            <Link href="/conversations">

                <button className="mb-8 bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">

                    Back To Conversations

                </button>

            </Link>

            {/* TITLE */}

            <h1 className="text-2xl md:text-4xl xl:text-5xl font-black mb-10">

                Chat #{conversationId}

            </h1>

            {/* CHAT */}

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 h-[600px] flex flex-col">

                {/* MESSAGES */}

                <div className="flex-1 overflow-y-auto space-y-4 mb-6">

                    {messages.map((message) => (

                        <div
                            key={`${message.id}-${message.sender_user_id}`}
                            className="bg-black border border-gray-700 rounded-2xl p-4"
                        >

                            <p className="text-sm text-yellow-400 mb-2">

                                User #{message.sender_user_id}

                            </p>

                            <p className="text-lg">

                                {message.content}

                            </p>

                        </div>
                    ))}

                </div>

                {/* INPUT */}

                <div className="flex gap-4">

                    <input
                        type="text"
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                        placeholder="Write a message..."
                        className="flex-1 bg-black border border-gray-700 rounded-2xl px-5 py-4 outline-none"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-yellow-400 text-black font-black px-8 rounded-2xl hover:scale-105 transition"
                    >

                        Send

                    </button>

                </div>

            </div>

        </div>
    );
}