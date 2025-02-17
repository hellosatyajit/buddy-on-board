'use client';
import { use } from "react";
import { notFound } from "next/navigation";
import TravelBuddyRating from "@/components/rating/travel-buddy-rating";
import CourierBuddyRating from "@/components/rating/courier-buddy-rating";
import RatingSubmitted from "@/components/rating/rating-submitted";
import { TRAVEL_DATA } from "@/lib/constants/booking";

export default async function RatingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const booking = TRAVEL_DATA.find(booking => booking.id === id);

    if (!booking) {
        notFound();
    }

    if (booking.ratingInfo?.rated) {
        return <RatingSubmitted />;
    }

    async function handleSubmitRating(data: any) {
        console.log(data);
    }

    return (
        <div className="max-w-2xl mx-auto px-4 lg:px-16 py-8 lg:py-14 space-y-12 min-h-[calc(100vh-5rem)]">
            <h2 className="text-[2.5rem] font-merriweather">Rate your buddy!</h2>

            {booking.requestInfo?.requestType === "travel" ? (
                <TravelBuddyRating onSubmit={handleSubmitRating} />
            ) : (
                <CourierBuddyRating onSubmit={handleSubmitRating} />
            )}
        </div>
    );
} 