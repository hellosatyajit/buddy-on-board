export interface Airport {
  id: number;
  name: string;
  iata_code: string;
  latitude: number;
  longitude: number;
  type: string;
  source: string;
  ident: string;
  elevation_ft: number;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  gps_code: string;
  local_code: string;
  is_armforced: 1 | 0;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface UserMetadata {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  countryOfResidence: string;
}

export type BookingStatus = "upcoming" | "requests" | "previous" | "canceled";
export type BookingRequestType = "travel" | "courier";

export interface TravelBuddy {
  id: string;
  name: string;
  profileImg: string;
  rating: number;
  languages: string[];
  departureTime: string;
  departureDate: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalLocation: string;
  type: BookingStatus;
  canceledDate?: string;
  requestInfo?: {
    sentDate: string;
    requestType: BookingRequestType;
    passengers?: number;
    documentType?: string;
  };
  ratingInfo?: {
    rated: boolean;
    userRating: number;
    comment: string;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
  senderName: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  verified: boolean;
  lastMessage?: string;
  lastMessageAt: Date;
  unread: boolean;
}

export interface ChatState {
  users: User[];
  activeChat: string | null;
  activeTab: "all" | "unread";
  searchQuery: string;
  messages: Record<string, Message[]>;
  setUsers: (users: User[]) => void;
  setActiveChat: (id: string | null) => void;
  setActiveTab: (tab: "all" | "unread") => void;
  setSearchQuery: (query: string) => void;
  addMessage: (chatId: string, message: Message) => void;
}

export type NotificationType = 'message' | 'review' | 'system' | 'booking';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    userId?: string;
    bookingId?: string;
    messageId?: string;
    avatarUrl?: string;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}
