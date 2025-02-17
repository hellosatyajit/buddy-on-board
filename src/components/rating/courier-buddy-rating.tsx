'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarRating } from "./star-rating";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const courierBuddyRatingSchema = z.object({
    timelinessOfDelivery: z.number().min(1).max(5),
    communicationThroughoutDelivery: z.number().min(1).max(5),
    packageHandling: z.number().min(1).max(5),
    overallDeliveryExperience: z.number().min(1).max(5),
    review: z.string().min(1, "Please add your review"),
});

type CourierBuddyRatingSchema = z.infer<typeof courierBuddyRatingSchema>;

interface CourierBuddyRatingProps {
    onSubmit: (data: CourierBuddyRatingSchema) => void;
}

export default function CourierBuddyRating({ onSubmit }: CourierBuddyRatingProps) {
    const form = useForm<CourierBuddyRatingSchema>({
        resolver: zodResolver(courierBuddyRatingSchema),
        defaultValues: {
            timelinessOfDelivery: 0,
            communicationThroughoutDelivery: 0,
            packageHandling: 0,
            overallDeliveryExperience: 0,
            review: "",
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <StarRating
                    label="Timeliness of Delivery*"
                    value={form.watch("timelinessOfDelivery")}
                    onChange={(value) => form.setValue("timelinessOfDelivery", value)}
                />
                <StarRating
                    label="Communication Throughout Delivery*"
                    value={form.watch("communicationThroughoutDelivery")}
                    onChange={(value) => form.setValue("communicationThroughoutDelivery", value)}
                />
                <StarRating
                    label="Package Handling*"
                    value={form.watch("packageHandling")}
                    onChange={(value) => form.setValue("packageHandling", value)}
                />
                <StarRating
                    label="Overall Delivery Experience*"
                    value={form.watch("overallDeliveryExperience")}
                    onChange={(value) => form.setValue("overallDeliveryExperience", value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="review" className="text-sm font-medium">Add your review*</Label>
                <Textarea
                    id="review"
                    placeholder="Type your message here"
                    rows={5}
                    {...form.register("review")}
                />
            </div>

            <Button type="submit" className="w-full h-12 px-8 text-xl">
                Submit review
            </Button>
        </form>
    );
} 