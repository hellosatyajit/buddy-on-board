"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat";

const TABS = [
  { label: "All", value: "all" as const },
  { label: "Unread", value: "unread" as const },
];

export function ChatTabs() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex p-1 gap-2 bg-[#fbfbfb] rounded-full w-fit">
      {TABS.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          variant="ghost"
          className={cn(
            "px-6 py-2 rounded-full",
            activeTab === tab.value
              ? "bg-[#191919] text-white"
              : "text-[#656565]"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
} 