import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CanceledBookingsPage() {
    return (
        <div className="m-auto max-w-screen-2xl px-4 lg:px-16 pt-4 lg:pt-16 py-8 text-center space-y-4">
            <h1 className="text-[2.5rem] font-merriweather text-[#0A0A0A] leading-none">Your booking has been canceled.</h1>
            <p className="text-gray-600">You will receive you refund to your original payment method in 10 business days.</p>
            <Button
                variant="default"
                className="w-fit h-12"
                asChild
            >
                <Link href="/booking/upcoming">
                    Go back to your bookings
                </Link>
            </Button>
        </div>
    );
} 