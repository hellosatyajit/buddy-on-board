"use client";

import { ConversationResponse } from "@/types/chat";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserCardProps {
  conversation: ConversationResponse;
  subtitle?: string;
  timestamp?: string;
  unread?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function UserCard({
  conversation,
  subtitle,
  timestamp,
  unread,
  active,
  onClick,
}: UserCardProps) {
  const participant = conversation.participant;

  return (
    <button
      className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors ${
        active
          ? "bg-primary text-white"
          : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {participant.image ? (
        <Avatar>
          <AvatarImage src={participant.image} />
          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-lg font-medium text-gray-500">
          {participant.name.charAt(0)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-medium truncate">
            {participant.name}
          </span>
          {unread && (
            <span
              className={`w-2 h-2 rounded-full ${
                active ? "bg-white" : "bg-primary"
              }`}
            />
          )}
        </div>
        {subtitle && (
          <p
            className={`text-sm truncate ${
              active ? "text-white/80" : "text-[#6e6e6e]"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {timestamp && (
        <span
          className={`text-xs whitespace-nowrap ${
            active ? "text-white/80" : "text-[#6e6e6e]"
          }`}
        >
          {timestamp}
        </span>
      )}
    </button>
  );
} 