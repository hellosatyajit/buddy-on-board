"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

interface CancelTripModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tripDetails: {
        amount: number;
        refundAmount: number;
        name: string;
        departureTime: string;
        departureDate: string;
        departureLocation: string;
        arrivalTime: string;
        arrivalDate: string;
        arrivalLocation: string;
    };
}

export default function CancelTripModal({
    open,
    onOpenChange,
    tripDetails,
}: CancelTripModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [reason, setReason] = useState("");
    const router = useRouter();

    const handleNext = () => {
        if (reason.trim()) {
            setStep(2);
        }
    };

    const handleConfirmCancellation = () => {
        router.push("/booking/canceled");
    };

    const renderStep1 = () => (
        <DialogContent className="">
            <DialogHeader>
                <DialogTitle>Why are you canceling?</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
                <div className="space-y-2">
                    <Label>Your message*</Label>
                    <Textarea
                        placeholder="Type your message here"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="min-h-[120px]"
                    />
                </div>
                <Button
                    onClick={handleNext}
                    disabled={!reason.trim()}
                    className="w-full text-xl h-12"
                >
                    Next
                </Button>
            </div>
        </DialogContent>
    );

    const renderStep2 = () => (
        <DialogContent className="">
            <DialogHeader>
                <DialogTitle>Confirm cancelation</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
                <div className="space-y-4">
                    <div className="flex">
                        <div className="flex-1 flex flex-col justify-between">
                            <span className="text-gray-600">You paid</span>
                            <span className="font-medium">${tripDetails.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <span className="text-gray-600">Your refund</span>
                            <span className="font-medium">${tripDetails.refundAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="space-y-4">
                        <p className="tetx-[#4D4D4D]">Trip details</p>
                        <div className="flex items-center gap-2">
                            <img
                                src="https://avatar.iran.liara.run/public"
                                alt={tripDetails.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span>{tripDetails.name}</span>
                            <div className="ml-auto">
                                <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                                    Travel Buddy
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="">
                                <p className="text-2xl font-semibold text-primary">
                                    {tripDetails.departureTime}
                                </p>
                                <p className="text-sm text-gray-400">{tripDetails.departureDate}</p>
                                <p className="text-base text-gray-400">
                                    {tripDetails.departureLocation}
                                </p>
                            </div>
                            <div className="bg-primary w-6 h-6 border-4 ring-4 ring-[#F7F7F7] border-[#EBEBEB] rounded-full flex items-center justify-center mt-2">
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
                            <div className="text-right">
                                <p className="text-2xl font-semibold text-primary">
                                    {tripDetails.arrivalTime}
                                </p>
                                <p className="text-sm text-gray-400">{tripDetails.arrivalDate}</p>
                                <p className="text-base text-gray-400">
                                    {tripDetails.arrivalLocation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="text-gray-600 text-base">
                    Your booking will be cancelled immediately and you will receive you refund
                    to your original payment method in 10 business days.
                </p>
                <Button
                    onClick={handleConfirmCancellation}
                    className="w-full text-xl h-12    "
                >
                    Confirm cancellation
                </Button>
            </div>
        </DialogContent>
    );

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                if (!newOpen) {
                    setStep(1);
                    setReason("");
                }
                onOpenChange(newOpen);
            }}
        >
            {step === 1 ? renderStep1() : renderStep2()}
        </Dialog>
    );
} 