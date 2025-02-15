import { User, Message } from "@/lib/types";

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "Alice",
    avatarUrl: "https://example.com/avatar1.png",
    verified: true,
    lastMessage: "Looking forward to our trip!",
    lastMessageAt: new Date(),
    unread: false,
  },
  {
    id: "2",
    name: "Bob",
    avatarUrl: "https://example.com/avatar2.png",
    verified: false,
    lastMessage: "Can we discuss the itinerary?",
    lastMessageAt: new Date(),
    unread: true,
  },
  {
    id: "3",
    name: "Charlie",
    avatarUrl: "https://example.com/avatar3.png",
    verified: true,
    lastMessage: "I have some questions about the service.",
    lastMessageAt: new Date(),
    unread: false,
  },
  {
    id: "4",
    name: "Diana",
    avatarUrl: "https://example.com/avatar4.png",
    verified: true,
    lastMessage: "Ready for our adventure!",
    lastMessageAt: new Date(),
    unread: true,
  },
  {
    id: "5",
    name: "Ethan",
    avatarUrl: "https://example.com/avatar5.png",
    verified: false,
    lastMessage: "When do we leave?",
    lastMessageAt: new Date(),
    unread: false,
  },
];

export const dummyMessages: Message[] = [
  {
    id: "1",
    content: "Hi Alice, are you ready for the trip?",
    sender: "user",
    timestamp: new Date().toISOString(),
    senderName: "Bob",
  },
  {
    id: "2",
    content: "Yes, I can't wait!",
    sender: "other",
    timestamp: new Date().toISOString(),
    senderName: "Alice",
  },
  {
    id: "3",
    content: "What time do we meet?",
    sender: "user",
    timestamp: new Date().toISOString(),
    senderName: "Charlie",
  },
  {
    id: "4",
    content: "Let's meet at 10 AM.",
    sender: "other",
    timestamp: new Date().toISOString(),
    senderName: "Diana",
  },
  {
    id: "5",
    content: "Looking forward to it!",
    sender: "user",
    timestamp: new Date().toISOString(),
    senderName: "Ethan",
  },
];
