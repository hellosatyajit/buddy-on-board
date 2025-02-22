import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageResponse } from "@/types/chat";

export function MessageBubble({
  message,
  isOwn
}: {
  message: MessageResponse;
  isOwn: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* <Avatar
        user={message.}
        className="h-6 w-6"
      /> */}
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[70%]",
          isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
} 