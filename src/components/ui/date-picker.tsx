"use client";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function DatePicker({
  date,
  setDate,
}: { date: Date | undefined; setDate: (date: Date | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="block w-full text-left">
          <span className={cn("truncate", !date && "text-muted-foreground")}>
            {date ? format(date, "PPP") : "Choose a date"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-2xl"
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
