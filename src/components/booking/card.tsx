'use client';

import { useState } from "react";
import { StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TravelBuddy } from "@/lib/types"
import Link from "next/link";
import CancelTripModal from "./cancel-trip-modal";

interface TravelBuddyCardProps {
    buddy: TravelBuddy;
}

export default function TravelBuddyCard({ buddy }: TravelBuddyCardProps) {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const {
        name,
        profileImg,
        rating,
        languages,
        departureTime,
        departureDate,
        departureLocation,
        arrivalTime,
        arrivalDate,
        arrivalLocation,
        type,
        canceledDate,
        requestInfo,
        ratingInfo
    } = buddy;

    const renderActionSection = () => {
        switch (type) {
            case 'canceled':
                return (
                    <div className="w-64 flex-col justify-center items-start gap-2 inline-flex">
                        <p className="text-[#6E6E6E]">
                            Your booking was canceled on {canceledDate}.
                        </p>
                    </div>
                );
            case 'requests':
                return (
                    <div className="w-80 flex-col justify-center items-start gap-2 inline-flex">
                        <p className="text-[#1E1E1E] font-medium text-xl">
                            Request sent on {requestInfo?.sentDate}
                        </p>
                        <p className="text-gray-500 text-base">
                            {requestInfo?.requestType === 'travel'
                                ? `${requestInfo.passengers} passengers`
                                : requestInfo?.documentType}
                        </p>
                        <Button
                            variant="link"
                            className="text-primary p-0 h-auto text-xl font-bold"
                        >
                            Edit request
                        </Button>
                    </div>
                );
            case 'previous':
                return (
                    <div className="w-64 flex-col justify-center items-start gap-1 inline-flex">
                        {ratingInfo?.rated ? (
                            <>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-1">
                                        {
                                            Array.from({ length: ratingInfo.userRating }).map((_, index) => (
                                                <StarIcon key={index} className="w-5 h-5 fill-primary text-primary" />
                                            ))
                                        }
                                    </div>
                                </div>
                                <p className="text-gray-600 text-base">
                                    {ratingInfo.comment}
                                </p>
                            </>
                        ) : (
                            <Button
                                variant="default"
                                className="w-full h-[50px] bg-primary hover:bg-primary/90 text-xl"
                            >
                                Rate my buddy
                            </Button>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="w-64 flex-col justify-center items-start gap-4 inline-flex">
                        <Button
                            variant="default"
                            className="w-full h-[50px] bg-primary hover:bg-primary/90 text-xl"
                        >
                            <Link href={`/chat/${buddy.id}`}>
                                Send message
                            </Link>
                        </Button>
                        <Button
                            variant="default"
                            className="w-full h-[50px] text-primary border-primary bg-white hover:bg-primary/10 text-xl"
                            onClick={() => setShowCancelModal(true)}
                        >
                            Cancel trip
                        </Button>
                        <CancelTripModal
                            open={showCancelModal}
                            onOpenChange={setShowCancelModal}
                            tripDetails={{
                                amount: 100.00,
                                refundAmount: 90.00,
                                name,
                                departureTime,
                                departureDate,
                                departureLocation,
                                arrivalTime,
                                arrivalDate,
                                arrivalLocation,
                            }}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-h-[9.25rem] p-4 bg-white rounded-2xl shadow-lg justify-start items-center gap-[2.625rem] inline-flex">
            <div className="grow shrink basis-0 flex-col justify-center items-start gap-3 inline-flex">
                <div className="self-stretch h-6 rounded-lg flex-col justify-start items-start gap-4 flex">
                    <div className="justify-start items-start gap-1 inline-flex">
                        <div className="px-2 py-1 bg-primary rounded-2xl justify-center items-center gap-0.5 flex overflow-hidden">
                            <p className="text-white text-sm font-normal leading-none">
                                {requestInfo?.requestType === 'courier' ? 'Courier Buddy' : 'Travel Buddy'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                    <img
                        className="w-[2.65rem] h-[2.65rem] relative rounded-full"
                        src={profileImg}
                        alt={name}
                    />
                    <div className="justify-start items-center gap-1 flex">
                        <p className="text-center text-[#1e1e1e] text-xl font-normal leading-normal">
                            {name}
                        </p>
                    </div>
                </div>
                <div className="self-stretch h-6 rounded-lg flex-col justify-start items-start gap-4 flex">
                    <div className="justify-start items-start gap-1 inline-flex">
                        <div className="self-stretch px-2 py-1 bg-[#1a6e4f] rounded-2xl justify-center items-center gap-0.5 flex overflow-hidden">
                            <StarIcon className="w-3.5 h-3.5 text-white fill-background" />
                            <div className="text-white text-sm font-normal leading-none">{rating}</div>
                        </div>
                        <div className="px-2 py-1 bg-[#f6bd41] rounded-2xl justify-center items-center gap-0.5 flex overflow-hidden">
                            <p className="text-black text-sm font-normal leading-none">
                                {languages.join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-px h-[116px] relative bg-[#cccccc] rounded-[64px]" />
            <div className="grow shrink basis-0 h-[73px] justify-between items-center flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                    <p className="self-stretch text-primary text-2xl font-semibold leading-[28.80px] tracking-tight">
                        {departureTime}
                    </p>
                    <p className="w-[135px] text-[#a5a5a5] text-sm font-medium leading-[16.80px]">
                        {departureDate}
                    </p>
                    <div className="self-stretch h-[19px] flex-col justify-start items-start gap-1 flex">
                        <p className="self-stretch text-[#a8a8a8] text-base font-medium leading-tight tracking-tight">
                            {departureLocation}
                        </p>
                    </div>
                </div>
                <div className="bg-primary w-6 h-6 border-4 ring-4 ring-[#F7F7F7] border-[#EBEBEB] rounded-full flex items-center justify-center">
                    <svg
                        width="16"
                        height="9"
                        className="w-3"
                        viewBox="0 0 16 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.0146 3.3499L15.381 4.71712C15.4134 4.83799 15.3964 4.96678 15.3338 5.07515C15.2713 5.18352 15.1682 5.26259 15.0473 5.29498L4.85416 8.02623C4.36415 8.15994 3.84396 8.13089 3.37188 7.94344C2.89981 7.75599 2.50138 7.4203 2.23655 6.98687L0.719273 4.53044C0.641987 4.40534 0.595005 4.26391 0.582076 4.11744C0.569147 3.97096 0.590629 3.82349 0.644807 3.68679C0.698986 3.55009 0.784362 3.42794 0.894124 3.33009C1.00389 3.23224 1.135 3.1614 1.277 3.12321L1.73274 3.00109C1.85346 2.96881 1.98206 2.98573 2.09032 3.04815L3.65543 3.95129L4.93663 3.60799L4.0127 2.21067C3.93028 2.08585 3.87872 1.94322 3.86226 1.79455C3.8458 1.64588 3.86492 1.49543 3.91804 1.3556C3.97116 1.21577 4.05676 1.09058 4.16778 0.990337C4.2788 0.890097 4.41206 0.817684 4.55657 0.779072L5.01231 0.656957C5.07216 0.640868 5.1346 0.63673 5.19605 0.644779C5.2575 0.652827 5.31677 0.672905 5.37046 0.703864L8.66857 2.60803L12.1254 1.68178C12.7297 1.51985 13.3736 1.60462 13.9155 1.91746C14.4573 2.23029 14.8527 2.74556 15.0146 3.3499Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-end gap-1 inline-flex">
                    <p className="self-stretch text-right text-primary text-2xl font-semibold leading-[28.80px] tracking-tight">
                        {arrivalTime}
                    </p>
                    <p className="w-[135px] text-right text-[#a4a4a4] text-sm font-medium leading-[16.80px]">
                        {arrivalDate}
                    </p>
                    <div className="self-stretch h-[19px] flex-col justify-start items-start gap-1 flex">
                        <p className="self-stretch text-right text-[#a8a8a8] text-base font-medium leading-tight tracking-tight">
                            {arrivalLocation}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-px h-[116px] relative bg-[#cccccc] rounded-[64px]" />
            {renderActionSection()}
        </div>
    );
}
