import { emptyMessages, TRAVEL_DATA } from "@/lib/constants/booking";
import TravelBuddyCard from "@/components/booking/card";
import type { BookingStatus } from "@/lib/types";

interface BookingTypePageProps {
    params: {
        type: BookingStatus;
    };
}

export default function BookingTypePage({ params: { type } }: BookingTypePageProps) {
    const filteredData = TRAVEL_DATA.filter((buddy) => buddy.type === type);

    return (
        <div className="space-y-4">
            {filteredData.length > 0 ? (
                filteredData.map((buddy) => (
                    <TravelBuddyCard
                        key={buddy.id}
                        buddy={buddy}
                    />
                ))
            ) : (
                <p className="text-center font-medium text-xl text-[#666666] py-16">
                    {emptyMessages[type]}
                </p>
            )}
        </div>
    );
}