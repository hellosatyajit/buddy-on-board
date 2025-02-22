"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";
import { useChatStore } from "@/stores/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/context/auth";
import Link from "next/link";
import { useParams } from "next/navigation";
import { groupMessagesByDate } from '@/utils/date';

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.id as string;
  const { messages, loading: messagesLoading, error, sendMessage, isSendingMessage } = useMessages(conversationId);
  const { conversations } = useConversations();
  const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);
  const { user, loading: authLoading } = useAuth();
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!conversationId) return;
    setActiveConversationId(conversationId);
    return () => setActiveConversationId(null);
  }, [conversationId, setActiveConversationId]);

  const conversation = conversations.find(
    (conv) => conv.id === conversationId
  );

  const messageGroups = useMemo(() => {
    return groupMessagesByDate(messages);
  }, [messages]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!messagesLoading && messages.length > 0) {
      if (isInitialMount.current) {
        scrollToBottom("auto");
        isInitialMount.current = false;
      } else {
        scrollToBottom("smooth");
      }
    }
  }, [messages, messagesLoading, scrollToBottom]);
  
  const handleSendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (isSendingMessage) return;
    if (message.trim()) {
      sendMessage(message.trim(), conversationId);
      setMessage("");
      scrollToBottom("smooth");
    }
  };

  const otherParticipant = conversation?.participant;

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-2xl font-merriweather text-[#090909] mb-4">
          Please login to continue
        </h2>
        <Button asChild variant="outline" className="w-auto">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (messagesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-2xl font-merriweather text-[#090909] mb-4">
          Error loading messages
        </h2>
        <p className="text-[#6e6e6e] max-w-md mb-6">{error.message}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="w-auto"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-6 bg-[#f8f8f8] rounded-2xl shadow-[0px_4px_32px_0px_rgba(0,0,0,0.06)] items-center overflow-hidden h-full">
      <div className="flex w-full justify-between items-center pt-4 pb-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={otherParticipant?.image || undefined} />
            <AvatarFallback>{otherParticipant?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xl text-[#1e1e1e] font-medium">
              {otherParticipant?.name}
            </span>
            <span className="text-sm text-[#6e6e6e]">
              {otherParticipant?.email}
            </span>
          </div>
        </div>
        <Button variant="ghost" className="text-primary">View details</Button>
      </div>

      <div ref={messageContainerRef} className="w-full p-6 bg-white rounded-2xl overflow-y-auto">
        <div className="space-y-4">
          {Object.entries(messageGroups).map(([date, groupMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {date}
                </span>
              </div>
              {groupMessages.map((message) => {
                const isCurrentUser = message.senderId === user.id;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                  >
                    {!isCurrentUser && (
                      <Avatar>
                        <AvatarImage src={otherParticipant?.image || undefined} />
                        <AvatarFallback>{otherParticipant?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col gap-1 max-w-[70%]">
                      <div className="flex items-center gap-1 text-xs text-[#6e6e6e]">
                        <span>{isCurrentUser ? "You" : otherParticipant?.name}</span>
                        <span>•</span>
                        <span>
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl break-words ${isCurrentUser
                          ? "bg-[#0d53e0] text-white rounded-bl-2xl"
                          : "bg-neutral-100 text-[#6e6e6e] rounded-br-2xl"
                          }`}
                      >
                        {message.content}
                        {message.attachments?.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="mt-2 p-2 bg-black/5 rounded"
                          >
                            <a
                              href={attachment.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm flex items-center gap-2 hover:underline"
                            >
                              📎 {attachment.fileName}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    {isCurrentUser && (
                      <Avatar>
                        <AvatarImage src={otherParticipant?.image || undefined} />
                        <AvatarFallback>{otherParticipant?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="w-full flex items-center gap-4 py-4">
        <Button variant="ghost" type="button" className="p-2">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V25C3 25.5304 3.21071 26.0391 3.58579 26.4142C3.96086 26.7893 4.46957 27 5 27H27C27.5304 27 28.0391 26.7893 28.4142 26.4142C28.7893 26.0391 29 25.5304 29 25V7C29 6.46957 28.7893 5.96086 28.4142 5.58579C28.0391 5.21071 27.5304 5 27 5ZM27 7V19.8438L23.7412 16.5863C23.5555 16.4005 23.335 16.2531 23.0923 16.1526C22.8497 16.052 22.5896 16.0003 22.3269 16.0003C22.0642 16.0003 21.8041 16.052 21.5614 16.1526C21.3187 16.2531 21.0982 16.4005 20.9125 16.5863L18.4125 19.0863L12.9125 13.5863C12.5375 13.2115 12.029 13.0009 11.4987 13.0009C10.9685 13.0009 10.46 13.2115 10.085 13.5863L5 18.6712V7H27ZM5 21.5L11.5 15L21.5 25H5V21.5ZM27 25H24.3288L19.8288 20.5L22.3288 18L27 22.6725V25ZM18 12.5C18 12.2033 18.088 11.9133 18.2528 11.6666C18.4176 11.42 18.6519 11.2277 18.926 11.1142C19.2001 11.0006 19.5017 10.9709 19.7926 11.0288C20.0836 11.0867 20.3509 11.2296 20.5607 11.4393C20.7704 11.6491 20.9133 11.9164 20.9712 12.2074C21.0291 12.4983 20.9993 12.7999 20.8858 13.074C20.7723 13.3481 20.58 13.5824 20.3334 13.7472C20.0867 13.912 19.7967 14 19.5 14C19.1022 14 18.7206 13.842 18.4393 13.5607C18.158 13.2794 18 12.8978 18 12.5Z" fill="#7E7E7E" />
          </svg>
        </Button>
        <Input
          name="message"
          placeholder="Type your message..."
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button type="submit" size="icon" className="rounded-md" disabled={isSendingMessage}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1149 8.90605L4.98985 1.41465C4.76847 1.29002 4.51436 1.2358 4.26138 1.25923C4.00841 1.28266 3.76858 1.38262 3.57384 1.54579C3.37911 1.70896 3.23872 1.92759 3.17137 2.17256C3.10403 2.41753 3.11293 2.67721 3.19689 2.91699L5.58985 9.9998L3.19689 17.0834C3.13029 17.2719 3.10987 17.4736 3.13735 17.6716C3.16483 17.8696 3.2394 18.0582 3.35481 18.2214C3.47022 18.3846 3.62309 18.5178 3.80061 18.6098C3.97812 18.7017 4.1751 18.7497 4.37501 18.7498C4.5922 18.7493 4.80559 18.6928 4.99454 18.5857L18.1133 11.0818C18.3068 10.9734 18.468 10.8155 18.5803 10.6243C18.6926 10.433 18.752 10.2153 18.7524 9.99352C18.7528 9.77173 18.6942 9.55383 18.5825 9.36217C18.4709 9.17052 18.3103 9.01201 18.1172 8.90293L18.1149 8.90605ZM4.37501 17.4998C4.37535 17.4967 4.37535 17.4935 4.37501 17.4904L6.69845 10.6248H11.25C11.4158 10.6248 11.5747 10.559 11.692 10.4417C11.8092 10.3245 11.875 10.1656 11.875 9.9998C11.875 9.83404 11.8092 9.67507 11.692 9.55786C11.5747 9.44065 11.4158 9.3748 11.25 9.3748H6.69845L4.3797 2.5123C4.37893 2.50788 4.37734 2.50364 4.37501 2.4998L17.5 9.98652L4.37501 17.4998Z" fill="white" />
          </svg>
        </Button>
      </form>
    </div>
  );
}
