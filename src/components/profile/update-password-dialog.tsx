"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/actions/auth";

const passwordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface UpdatePasswordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function UpdatePasswordDialog({ open, onOpenChange }: UpdatePasswordDialogProps) {
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema)
    });

    const onSubmit = async (data: PasswordFormData) => {
        setError(null);
        const { error: updateError } = await resetPassword(data.newPassword);

        if (updateError) {
            setError(updateError.message);
        } else {
            onOpenChange(false);
            reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update your password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="New password"
                        {...register("newPassword")}
                        className={cn({
                            "border-red-500": errors.newPassword
                        })}
                    />
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-type new password"
                        {...register("confirmPassword")}
                        className={cn({
                            "border-red-500": errors.confirmPassword
                        })}
                    />
                    <p className="text-sm text-gray-500">Must be at least 8 characters.</p>
                    {(errors.newPassword || errors.confirmPassword || error) && (
                        <p className="text-red-500 text-sm">
                            {errors.newPassword?.message || errors.confirmPassword?.message || error}
                        </p>
                    )}
                    <Button type="submit" className="w-full h-12" disabled={!isDirty}>
                        Save changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 