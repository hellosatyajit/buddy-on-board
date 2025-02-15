import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatState } from '@/lib/types'
import { dummyUsers } from '@/lib/constants/chat'

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      users: dummyUsers,
      activeChat: null,
      activeTab: "all",
      searchQuery: "",
      messages: {},
      setUsers: (users) => set({ users }),
      setActiveChat: (id) => set({ activeChat: id }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      addMessage: (chatId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), message],
          },
        })),
    }),
    {
      name: 'chat-store',
    }
  )
) 