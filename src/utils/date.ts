import { MessageResponse } from '@/types/chat';
import { format, isToday, isYesterday } from 'date-fns';

export const formatMessageDate = (date: Date) => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'dd MMM yyyy');
};

export const groupMessagesByDate = (messages: MessageResponse[]) => {
  const groups: { [key: string]: MessageResponse[] } = {};
  
  messages.forEach((message) => {
    const dateKey = formatMessageDate(new Date(message.createdAt));
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });
  
  return groups;
}; 