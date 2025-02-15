"use client";

import { type User } from "@/lib/types";
import { VerifiedBadge } from "./verified-badge";

interface UserCardProps {
  user: User;
  subtitle?: string;
  timestamp?: string;
  unread?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function UserCard({
  user,
  subtitle,
  timestamp,
  unread,
  active,
  onClick,
}: UserCardProps) {
  return (
    <div
      className={`p-4 rounded-2xl hover:bg-neutral-50 transition-colors hover:cursor-pointer ${
        active ? "bg-neutral-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F0F0F0]" />
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-xl text-[#1e1e1e]">{user.name}</span>
              {user.verified && <VerifiedBadge />}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#6e6e6e]">
              {timestamp && <span>{timestamp}</span>}
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9375 10C10.9375 10.1854 10.8825 10.3667 10.7795 10.5208C10.6765 10.675 10.5301 10.7952 10.3588 10.8661C10.1875 10.9371 9.99896 10.9557 9.8171 10.9195C9.63525 10.8833 9.4682 10.794 9.33709 10.6629C9.20598 10.5318 9.11669 10.3648 9.08051 10.1829C9.04434 10.001 9.06291 9.81254 9.13386 9.64123C9.20482 9.46993 9.32498 9.32351 9.47915 9.2205C9.63332 9.11748 9.81458 9.0625 10 9.0625C10.2486 9.0625 10.4871 9.16127 10.6629 9.33709C10.8387 9.5129 10.9375 9.75136 10.9375 10ZM10 5.625C10.1854 5.625 10.3667 5.57002 10.5208 5.467C10.675 5.36399 10.7952 5.21757 10.8661 5.04627C10.9371 4.87496 10.9557 4.68646 10.9195 4.5046C10.8833 4.32275 10.794 4.1557 10.6629 4.02459C10.5318 3.89348 10.3648 3.80419 10.1829 3.76801C10.001 3.73184 9.81254 3.75041 9.64123 3.82136C9.46993 3.89232 9.32351 4.01248 9.2205 4.16665C9.11748 4.32082 9.0625 4.50208 9.0625 4.6875C9.0625 4.93614 9.16127 5.1746 9.33709 5.35041C9.5129 5.52623 9.75136 5.625 10 5.625ZM10 14.375C9.81458 14.375 9.63332 14.43 9.47915 14.533C9.32498 14.636 9.20482 14.7824 9.13386 14.9537C9.06291 15.125 9.04434 15.3135 9.08051 15.4954C9.11669 15.6773 9.20598 15.8443 9.33709 15.9754C9.4682 16.1065 9.63525 16.1958 9.8171 16.232C9.99896 16.2682 10.1875 16.2496 10.3588 16.1786C10.5301 16.1077 10.6765 15.9875 10.7795 15.8333C10.8825 15.6792 10.9375 15.4979 10.9375 15.3125C10.9375 15.0639 10.8387 14.8254 10.6629 14.6496C10.4871 14.4738 10.2486 14.375 10 14.375Z" fill="#6E6E6E" />
              </svg>
            </div>
          </div>
          {subtitle && (
            <p className={`text-[#6e6e6e] text-base truncate ${unread ? "font-medium" : ""}`}>
              {subtitle}
            </p>
          )}
          <div className="flex justify-between items-center">
            <div className="px-2 py-1 bg-[#0d53e0] rounded-2xl text-white text-sm">
              Travel Buddy
            </div>
            <span className="text-[#b3b3b3] text-xs">LA, USA to YVR, Canada</span>
          </div>
        </div>
      </div>
    </div>
  );
} 