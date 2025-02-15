"use client";

import { useNotificationStore } from "@/stores/notification";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { notifications as notificationsData } from "@/lib/constants/notification";

export default function NotificationsPage() {
  const { notifications, removeNotification, setNotifications } = useNotificationStore();

  useEffect(() => {
    setNotifications(notificationsData);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 md:p-16 space-y-6 md:space-y-12 h-[calc(100vh-5rem)]">
      <h1 className="text-[2.5rem] font-merriweather leading-none">Notifications</h1>
      <div className="space-y-4 md:space-y-6">
        {
          notifications.length === 0
            ? (
              <p className="text-[#333333]">You’re all caught up.</p>
            )
            : (
              notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-2 group">
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="size-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors"
                  >
                    <svg className="block group-hover:hidden" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.4528 21.5311C21.906 18.8569 19.5223 16.9394 16.7405 16.0305C18.1165 15.2113 19.1856 13.9631 19.7835 12.4776C20.3815 10.9921 20.4753 9.3513 20.0505 7.8073C19.6257 6.26331 18.7058 4.90144 17.4321 3.93083C16.1584 2.96023 14.6013 2.43457 12.9999 2.43457C11.3986 2.43457 9.84148 2.96023 8.56778 3.93083C7.29408 4.90144 6.3742 6.26331 5.94941 7.8073C5.52462 9.3513 5.61841 10.9921 6.21636 12.4776C6.81432 13.9631 7.88339 15.2113 9.25939 16.0305C6.4776 16.9384 4.09392 18.8559 2.54713 21.5311C2.4904 21.6236 2.45278 21.7265 2.43647 21.8338C2.42017 21.941 2.42551 22.0505 2.45219 22.1556C2.47887 22.2608 2.52634 22.3596 2.59181 22.4461C2.65727 22.5326 2.7394 22.6052 2.83336 22.6594C2.92731 22.7137 3.03118 22.7486 3.13884 22.7621C3.2465 22.7755 3.35577 22.7673 3.4602 22.7379C3.56463 22.7084 3.6621 22.6584 3.74687 22.5907C3.83164 22.5229 3.90199 22.4389 3.95377 22.3436C5.86721 19.0367 9.24924 17.0623 12.9999 17.0623C16.7506 17.0623 20.1327 19.0367 22.0461 22.3436C22.0979 22.4389 22.1682 22.5229 22.253 22.5907C22.3378 22.6584 22.4353 22.7084 22.5397 22.7379C22.6441 22.7673 22.7534 22.7755 22.861 22.7621C22.9687 22.7486 23.0726 22.7137 23.1665 22.6594C23.2605 22.6052 23.3426 22.5326 23.4081 22.4461C23.4735 22.3596 23.521 22.2608 23.5477 22.1556C23.5744 22.0505 23.5797 21.941 23.5634 21.8338C23.5471 21.7265 23.5095 21.6236 23.4528 21.5311Z" fill="white" />
                    </svg>
                    <svg className="hidden group-hover:block" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.8873 15.7381C16.9628 15.8136 17.0227 15.9032 17.0635 16.0018C17.1044 16.1005 17.1254 16.2062 17.1254 16.313C17.1254 16.4197 17.1044 16.5254 17.0635 16.6241C17.0227 16.7227 16.9628 16.8123 16.8873 16.8878C16.8118 16.9633 16.7222 17.0232 16.6236 17.064C16.5249 17.1049 16.4192 17.1259 16.3125 17.1259C16.2057 17.1259 16.1 17.1049 16.0014 17.064C15.9027 17.0232 15.8131 16.9633 15.7376 16.8878L8.99996 10.1491L2.26231 16.8878C2.10985 17.0403 1.90307 17.1259 1.68746 17.1259C1.47186 17.1259 1.26508 17.0403 1.11262 16.8878C0.960162 16.7353 0.874512 16.5286 0.874512 16.313C0.874512 16.0973 0.960162 15.8906 1.11262 15.7381L7.85129 9.00045L1.11262 2.2628C0.960162 2.11034 0.874512 1.90356 0.874512 1.68795C0.874512 1.47234 0.960162 1.26557 1.11262 1.11311C1.26508 0.96065 1.47186 0.875 1.68746 0.875C1.90307 0.875 2.10985 0.96065 2.26231 1.11311L8.99996 7.85178L15.7376 1.11311C15.8901 0.96065 16.0969 0.875 16.3125 0.875C16.5281 0.875 16.7348 0.96065 16.8873 1.11311C17.0398 1.26557 17.1254 1.47234 17.1254 1.68795C17.1254 1.90356 17.0398 2.11034 16.8873 2.2628L10.1486 9.00045L16.8873 15.7381Z" fill="black" />
                    </svg>
                  </button>
                  <div className="flex-1 space-y-1">
                    <p className="text-[15px] leading-tight">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: false })} ago
                    </p>
                  </div>
                </div>
              ))
            )
        }
      </div>
    </div>
  );
} 