"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import type { BookingStatus } from "@/lib/types";

const TABS: { label: string; value: BookingStatus }[] = [
    {
        label: "Upcoming",
        value: "upcoming",
    },
    {
        label: "Requests",
        value: "requests",
    },
    {
        label: "Previous",
        value: "previous",
    },
];

export default function BookingTabs() {
    const pathname = usePathname();
    const currentTab = pathname.split("/").pop() as BookingStatus;

    return (
        <div className="flex w-fit gap-2 rounded-full bg-[#F0F0F0] p-1">
            {TABS.map((tab) => (
                <Button
                    key={tab.value}
                    variant="ghost"
                    className={`rounded-full ${
                        currentTab === tab.value 
                            ? "bg-black text-white" 
                            : "text-[#A1A1A1]"
                    }`}
                    asChild
                >
                    <Link href={`/booking/${tab.value}`}>
                        {tab.label}
                    </Link>
                </Button>
            ))}
        </div>
    );
}