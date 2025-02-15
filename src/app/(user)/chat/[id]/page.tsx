"use client";

import { useState, useEffect, use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat";
import { Message, User } from "@/lib/types";
import { dummyMessages } from "@/lib/constants/chat";

const generateId = () => Math.random().toString(36).substr(2, 9);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: PageProps) {
  const [newMessage, setNewMessage] = useState("");
  const { messages, addMessage, users, activeChat, setActiveChat } = useChatStore();
  const { id } = use(params);

  useEffect(() => {
    setActiveChat(id);
    
    if (!messages[id]) {
      dummyMessages.forEach((message: Message) => {
        addMessage(id, message);
      });
    }

    return () => {
      if (activeChat === id) {
        setActiveChat(null);
      }
    };
  }, [id, setActiveChat, messages, addMessage, activeChat]);

  const currentUser = users.find((user: User) => user.id === id);
  const currentMessages = messages[id] || [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: generateId(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: "You",
    };

    addMessage(id, message);
    setNewMessage("");
  };

  if (!currentUser) {
    return <div className="flex items-center justify-center h-full">Chat not found</div>;
  }

  return (
    <div className="flex flex-col px-6 bg-[#f8f8f8] rounded-2xl shadow-[0px_4px_32px_0px_rgba(0,0,0,0.06)] items-center overflow-hidden max-h-full">
      <div className="flex w-full justify-between items-center pt-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0F0F0]" />
          <div className="flex items-center gap-1">
            <span className="text-xl text-[#1e1e1e]">{currentUser.name}</span>
            {currentUser.verified && (
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.3944 8.88188L13.3925 8.88381C13.0937 9.19571 12.7847 9.51832 12.6206 9.91438C12.4631 10.2956 12.4562 10.7312 12.45 11.1531C12.4437 11.5906 12.4369 12.0488 12.2425 12.2425C12.0481 12.4363 11.5931 12.4437 11.1531 12.45C10.7312 12.4562 10.2956 12.4631 9.91438 12.6206C9.51832 12.7847 9.19571 13.0937 8.88381 13.3925L8.88188 13.3944L8.88074 13.3955C8.5686 13.6945 8.2497 14 8 14C7.75 14 7.42812 13.6925 7.11812 13.3944C6.80812 13.0962 6.4825 12.785 6.08563 12.6206C5.70438 12.4631 5.26875 12.4562 4.84688 12.45C4.40938 12.4437 3.95125 12.4369 3.7575 12.2425C3.56375 12.0481 3.55625 11.5931 3.55 11.1531C3.54375 10.7312 3.53687 10.2956 3.37937 9.91438C3.21534 9.51832 2.90628 9.19571 2.60747 8.88381L2.60562 8.88188L2.60455 8.88075C2.30551 8.56861 2 8.2497 2 8C2 7.75 2.3075 7.42812 2.60562 7.11812C2.90375 6.80812 3.215 6.4825 3.37937 6.08563C3.53687 5.70438 3.54375 5.26875 3.55 4.84688C3.55625 4.40938 3.56312 3.95125 3.7575 3.7575C3.95187 3.56375 4.40688 3.55625 4.84688 3.55C5.26875 3.54375 5.70438 3.53687 6.08563 3.37937C6.48168 3.21534 6.80429 2.90628 7.11619 2.60747L7.11812 2.60562L7.11925 2.60455C7.43139 2.30551 7.7503 2 8 2C8.25 2 8.57188 2.3075 8.88188 2.60562C9.19188 2.90375 9.5175 3.215 9.91438 3.37937C10.2956 3.53687 10.7312 3.54375 11.1531 3.55C11.5906 3.55625 12.0488 3.56312 12.2425 3.7575C12.4363 3.95187 12.4437 4.40688 12.45 4.84688C12.4562 5.26875 12.4631 5.70438 12.6206 6.08563C12.7847 6.48168 13.0937 6.80429 13.3925 7.11619L13.3944 7.11812L13.3955 7.11926C13.6945 7.4314 14 7.7503 14 8C14 8.25 13.6925 8.57188 13.3944 8.88188ZM10.9623 6.30853C10.9371 6.24783 10.9002 6.19269 10.8538 6.14625C10.8073 6.09976 10.7522 6.06288 10.6915 6.03772C10.6308 6.01256 10.5657 5.99961 10.5 5.99961C10.4343 5.99961 10.3692 6.01256 10.3085 6.03772C10.2478 6.06288 10.1927 6.09976 10.1462 6.14625L7 9.29313L5.85375 8.14625C5.75993 8.05243 5.63268 7.99972 5.5 7.99972C5.36732 7.99972 5.24007 8.05243 5.14625 8.14625C5.05243 8.24007 4.99972 8.36732 4.99972 8.5C4.99972 8.63268 5.05243 8.75993 5.14625 8.85375L6.64625 10.3538C6.69269 10.4002 6.74783 10.4371 6.80853 10.4623C6.86923 10.4874 6.93429 10.5004 7 10.5004C7.06571 10.5004 7.13077 10.4874 7.19147 10.4623C7.25217 10.4371 7.30731 10.4002 7.35375 10.3538L10.8538 6.85375C10.9002 6.80731 10.9371 6.75217 10.9623 6.69147C10.9874 6.63077 11.0004 6.56571 11.0004 6.5C11.0004 6.43429 10.9874 6.36923 10.9623 6.30853Z" fill="#1F14F0" />
              </svg>
            )}
          </div>
        </div>
        <Button variant="ghost" className="text-primary">View details</Button>
      </div>
      <div className="w-full p-6 bg-white rounded-2xl overflow-y-auto">
        <div className="py-2 text-center">
          <span className="text-xs text-[#6e6e6e]">TUESDAY</span>
        </div>

        <div className="space-y-4">
          {currentMessages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {message.sender === "other" && (
                <div className="w-10 h-10 rounded-full bg-[#F0F0F0]" />
              )}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-xs text-[#6e6e6e]">
                  <span>{message.senderName}</span>
                  <span>•</span>
                  <span>{message.timestamp}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-md ${message.sender === "user"
                    ? "bg-[#0d53e0] text-white rounded-bl-2xl"
                    : "bg-neutral-100 text-[#6e6e6e] rounded-br-2xl"
                    }`}
                >
                  {message.content}
                </div>
              </div>
              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-[#F0F0F0]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center gap-4 py-4">
        <Button variant="ghost" className="p-2">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V25C3 25.5304 3.21071 26.0391 3.58579 26.4142C3.96086 26.7893 4.46957 27 5 27H27C27.5304 27 28.0391 26.7893 28.4142 26.4142C28.7893 26.0391 29 25.5304 29 25V7C29 6.46957 28.7893 5.96086 28.4142 5.58579C28.0391 5.21071 27.5304 5 27 5ZM27 7V19.8438L23.7412 16.5863C23.5555 16.4005 23.335 16.2531 23.0923 16.1526C22.8497 16.052 22.5896 16.0003 22.3269 16.0003C22.0642 16.0003 21.8041 16.052 21.5614 16.1526C21.3187 16.2531 21.0982 16.4005 20.9125 16.5863L18.4125 19.0863L12.9125 13.5863C12.5375 13.2115 12.029 13.0009 11.4987 13.0009C10.9685 13.0009 10.46 13.2115 10.085 13.5863L5 18.6712V7H27ZM5 21.5L11.5 15L21.5 25H5V21.5ZM27 25H24.3288L19.8288 20.5L22.3288 18L27 22.6725V25ZM18 12.5C18 12.2033 18.088 11.9133 18.2528 11.6666C18.4176 11.42 18.6519 11.2277 18.926 11.1142C19.2001 11.0006 19.5017 10.9709 19.7926 11.0288C20.0836 11.0867 20.3509 11.2296 20.5607 11.4393C20.7704 11.6491 20.9133 11.9164 20.9712 12.2074C21.0291 12.4983 20.9993 12.7999 20.8858 13.074C20.7723 13.3481 20.58 13.5824 20.3334 13.7472C20.0867 13.912 19.7967 14 19.5 14C19.1022 14 18.7206 13.842 18.4393 13.5607C18.158 13.2794 18 12.8978 18 12.5Z" fill="#7E7E7E" />
          </svg>
        </Button>
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="w-full"
          />
        </div>
        <Button
          onClick={handleSendMessage}
          size="icon"
          className="rounded-md"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1149 8.90605L4.98985 1.41465C4.76847 1.29002 4.51436 1.2358 4.26138 1.25923C4.00841 1.28266 3.76858 1.38262 3.57384 1.54579C3.37911 1.70896 3.23872 1.92759 3.17137 2.17256C3.10403 2.41753 3.11293 2.67721 3.19689 2.91699L5.58985 9.9998L3.19689 17.0834C3.13029 17.2719 3.10987 17.4736 3.13735 17.6716C3.16483 17.8696 3.2394 18.0582 3.35481 18.2214C3.47022 18.3846 3.62309 18.5178 3.80061 18.6098C3.97812 18.7017 4.1751 18.7497 4.37501 18.7498C4.5922 18.7493 4.80559 18.6928 4.99454 18.5857L18.1133 11.0818C18.3068 10.9734 18.468 10.8155 18.5803 10.6243C18.6926 10.433 18.752 10.2153 18.7524 9.99352C18.7528 9.77173 18.6942 9.55383 18.5825 9.36217C18.4709 9.17052 18.3103 9.01201 18.1172 8.90293L18.1149 8.90605ZM4.37501 17.4998C4.37535 17.4967 4.37535 17.4935 4.37501 17.4904L6.69845 10.6248H11.25C11.4158 10.6248 11.5747 10.559 11.692 10.4417C11.8092 10.3245 11.875 10.1656 11.875 9.9998C11.875 9.83404 11.8092 9.67507 11.692 9.55786C11.5747 9.44065 11.4158 9.3748 11.25 9.3748H6.69845L4.3797 2.5123C4.37893 2.50788 4.37734 2.50364 4.37501 2.4998L17.5 9.98652L4.37501 17.4998Z" fill="white" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
