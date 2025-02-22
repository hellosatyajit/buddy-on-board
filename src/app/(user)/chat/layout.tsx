"use client";

import { Input } from "@/components/ui/input";
import { ChatTabs } from "@/components/chat/tabs";
import { UserCard } from "@/components/chat/user-card";
import { formatDistanceToNow } from "date-fns";
import { useConversations } from "@/hooks/useConversations";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useChatStore } from "@/stores/chat";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const { conversations, loading, error, markAsRead } = useConversations();
  const [searchQuery, setSearchQuery] = useState("");
  const { activeTab } = useChatStore();

  const activeChat = params?.id as string;

  const filteredConversations = conversations
    .filter((conversation) => {
      const matchesSearch = conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || (activeTab === "unread" && conversation.unreadCount > 0);
      return matchesSearch && matchesTab;
    });

  if (error) {
    return <div>Error loading conversations: {error.message}</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto p-4 md:p-16 space-y-6">
      <h1 className="text-[#090909] text-4xl font-merriweather">Your conversations</h1>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search your inbox"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm pl-10"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#717680]"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.56633 15.1327C12.1928 15.1327 15.1327 12.1928 15.1327 8.56633C15.1327 4.93984 12.1928 2 8.56633 2C4.93984 2 2 4.93984 2 8.56633C2 12.1928 4.93984 15.1327 8.56633 15.1327Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5204 17.5204L13.3418 13.3418" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex gap-3 max-h-[calc(100vh-17rem)]">
        <div className="space-y-6">
          <ChatTabs />
          <div className="flex flex-col gap-3 min-w-[24rem] max-w-sm w-full h-[calc(100%-4.5rem)] overflow-y-scroll">
            {filteredConversations.map((conversation) => (
              <UserCard
                key={conversation.id}
                conversation={conversation}
                subtitle={conversation.lastMessage?.content ?? ""}
                timestamp={conversation.lastMessage?.createdAt ? formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { addSuffix: true }) : undefined}
                unread={conversation.unreadCount > 0}
                active={activeChat === conversation.id}
                onClick={() => {
                  router.push(`/chat/${conversation.id}`);
                }}
              />
            ))}
            {filteredConversations.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No conversations found
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
