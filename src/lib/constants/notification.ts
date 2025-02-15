import { Notification } from "../types";

const generateId = () => Math.random().toString(36).substr(2, 9);

const now = new Date();
const fourMinutesAgo = new Date(now.getTime() - 4 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

export const notifications: Notification[] = [
  {
    id: generateId(),
    type: "message",
    title: "",
    message: "Jeevan sent you a message. Tap to reply and finalize details.",
    timestamp: fourMinutesAgo,
    read: false,
    actionUrl: "/chat/jeevan",
    metadata: {
      userId: "jeevan-id",
    },
  },
  {
    id: generateId(),
    type: "review",
    title: "",
    message:
      "How was your experience with Michael? Leave a review to help improve our community!",
    timestamp: twoDaysAgo,
    read: false,
    actionUrl: "/review/michael",
    metadata: {
      userId: "michael-id",
    },
  },
  {
    id: generateId(),
    type: "system",
    title: "",
    message: "Your profile has been successfully verified!",
    timestamp: twoDaysAgo,
    read: false,
    metadata: {},
  },
];