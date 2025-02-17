"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import UpdatePasswordDialog from "@/components/profile/update-password-dialog";
import { useAuth } from "@/components/context/auth";
import { updateUserMetadata } from "@/actions/auth";

const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    middleName: z.string().optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    countryOfResidence: z.string().min(1, "Country of residence is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema)
    });

    useEffect(() => {
        if (user) {
            const { user_metadata } = user;
            reset({
                firstName: user_metadata?.firstName || "",
                lastName: user_metadata?.lastName || "",
                middleName: user_metadata?.middleName || "",
                dateOfBirth: user_metadata?.dateOfBirth || "",
                email: user.email || "",
                phoneNumber: user_metadata?.phoneNumber || "",
                countryOfResidence: user_metadata?.countryOfResidence || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        setError(null);
        const { error: updateError } = await updateUserMetadata({
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            countryOfResidence: data.countryOfResidence,
        });

        if (updateError) {
            setError(updateError.message);
        } else {
            reset(data);
        }
    };

    const handleDiscardChanges = () => {
        if (user) {
            const { user_metadata } = user;
            reset({
                firstName: user_metadata?.firstName || "",
                lastName: user_metadata?.lastName || "",
                middleName: user_metadata?.middleName || "",
                dateOfBirth: user_metadata?.dateOfBirth || "",
                email: user.email || "",
                phoneNumber: user_metadata?.phoneNumber || "",
                countryOfResidence: user_metadata?.countryOfResidence || "",
            });
        }
    };

    const getErrorMessage = (errors: any) => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length === 0) return null;
        return errors[errorKeys[0]].message;
    };

    const errorMessage = getErrorMessage(errors) || error;

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-screen-2xl mx-auto p-4 md:p-16 space-y-6 md:space-y-12">
            <h1 className="text-[2.5rem] font-merriweather leading-none">Your profile</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name*</Label>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            className={cn({
                                "border-red-500": errors.firstName
                            })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name*</Label>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            className={cn({
                                "border-red-500": errors.lastName
                            })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of birth*</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            {...register("dateOfBirth")}
                            className={cn({
                                "border-red-500": errors.dateOfBirth
                            })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="middleName">Middle name</Label>
                        <Input
                            id="middleName"
                            {...register("middleName")}
                            className={cn({
                                "border-red-500": errors.middleName
                            })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input
                            id="email"
                            {...register("email")}
                            disabled
                            className="bg-gray-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone number</Label>
                        <Input
                            id="phoneNumber"
                            {...register("phoneNumber")}
                            className={cn({
                                "border-red-500": errors.phoneNumber
                            })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="countryOfResidence">Country of residence</Label>
                        <Input
                            id="countryOfResidence"
                            {...register("countryOfResidence")}
                            className={cn({
                                "border-red-500": errors.countryOfResidence
                            })}
                        />
                    </div>
                </div>

                <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => setIsPasswordModalOpen(true)}
                >
                    Update password
                </Button>

                {errorMessage && (
                    <div className="text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        disabled={!isDirty}
                        className="text-xl h-12 px-8 font-semibold"
                    >
                        Save changes
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleDiscardChanges}
                        disabled={!isDirty}
                        className="text-xl h-12 px-8 font-semibold"
                    >
                        Discard Changes
                    </Button>
                </div>
            </form>

            <UpdatePasswordDialog
                open={isPasswordModalOpen}
                onOpenChange={setIsPasswordModalOpen}
            />
        </div>
    );
}
