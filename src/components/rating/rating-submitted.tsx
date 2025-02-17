import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RatingSubmitted() {
    return (
        <div className="m-auto max-w-screen-2xl px-4 lg:px-16 pt-4 lg:pt-16 py-8 text-center space-y-4 h-[calc(100vh-5rem)] flex flex-col justify-center items-center">
            <h1 className="text-[2.5rem] font-merriweather text-[#0A0A0A] leading-none">Your review has been submitted!</h1>
            <p className="text-gray-600">Your review will be visible on your buddy&apos;s profile.</p>
            <Button
                variant="default"
                className="w-fit h-12 text-xl px-8"
                asChild
            >
                <Link href="/booking/upcoming">
                    Go back to your bookings
                </Link>
            </Button>
        </div>
    );
} 