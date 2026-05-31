"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import Sidebar from "../components/Sidebar";

export default function ConversationsPage() {

  const [conversations, setConversations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchConversations();

  }, []);

  async function fetchConversations() {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        window.location.href =
          "/login";

        return;
      }

      // GET CURRENT USER

      const meResponse =
        await fetch(
          "https://drivers-platform-production.up.railway.app/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const meData =
        await meResponse.json();

      const userId =
        meData.id;

      // GET CONVERSATIONS

      const response =
        await fetch(
          `https://drivers-platform-production.up.railway.app/conversations/${userId}`
        );

      const data =
        await response.json();

      console.log(data);

      if (Array.isArray(data)) {

        setConversations(data);

      } else {

        setConversations([]);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (

      <div className="flex">

        <Sidebar />

        <div className="
          flex-1
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
          text-4xl
        ">

          Loading...

        </div>

      </div>
    );
  }

  return (

    <div className="
      flex
      min-h-screen
      bg-black
      text-white
    ">

      <Sidebar />

      <div className="flex-1 p-5 md:p-8 xl:p-10">

        <h1 className="
          text-7xl
          font-black
          mb-10
        ">

          Conversations

        </h1>

        <div className="space-y-6">

         {conversations.map((conversation) => (

   <Link
  href={`/chat/${conversation.id}`}
  key={conversation.id}
  className="
    block
    bg-white/5
    border
    border-white/10
    rounded-[32px]
    p-8
    hover:border-yellow-400
    transition-all
  "
>

  <div className="
    flex
    items-center
    justify-between
  ">

    <div>

      <h2 className="
        text-4xl
        font-black
        mb-3
      ">

        {conversation.other_user_name}

      </h2>

      <p className="text-white/60">

        {conversation.last_message ||
          "No messages yet"}

      </p>

    </div>

    {conversation.unread_count > 0 && (

      <div className="
        w-10
        h-10
        rounded-full
        bg-red-500
        flex
        items-center
        justify-center
        font-black
      ">

        {conversation.unread_count}

      </div>

    )}

  </div>

</Link>
))}

        </div>

      </div>

    </div>
  );
}