'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarRating } from "./star-rating";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
const travelBuddyRatingSchema = z.object({
    punctualityAndReliability: z.number().min(1).max(5),
    friendlinessAndBehavior: z.number().min(1).max(5),
    communicationSkills: z.number().min(1).max(5),
    overallJourneyExperience: z.number().min(1).max(5),
    review: z.string().min(1, "Please add your review"),
});

type TravelBuddyRatingSchema = z.infer<typeof travelBuddyRatingSchema>;

interface TravelBuddyRatingProps {
    onSubmit: (data: TravelBuddyRatingSchema) => void;
}

export default function TravelBuddyRating({ onSubmit }: TravelBuddyRatingProps) {
    const form = useForm<TravelBuddyRatingSchema>({
        resolver: zodResolver(travelBuddyRatingSchema),
        defaultValues: {
            punctualityAndReliability: 0,
            friendlinessAndBehavior: 0,
            communicationSkills: 0,
            overallJourneyExperience: 0,
            review: "",
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <StarRating
                    label="Punctuality and Reliability*"
                    value={form.watch("punctualityAndReliability")}
                    onChange={(value) => form.setValue("punctualityAndReliability", value)}
                />
                <StarRating
                    label="Friendliness and Behavior*"
                    value={form.watch("friendlinessAndBehavior")}
                    onChange={(value) => form.setValue("friendlinessAndBehavior", value)}
                />
                <StarRating
                    label="Communication Skills*"
                    value={form.watch("communicationSkills")}
                    onChange={(value) => form.setValue("communicationSkills", value)}
                />
                <StarRating
                    label="Overall Journey Experience*"
                    value={form.watch("overallJourneyExperience")}
                    onChange={(value) => form.setValue("overallJourneyExperience", value)}
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