"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { forgotPassword } from "@/actions/auth"

const forgotPasswordSchema = z
    .object({
        email: z.string().email("Invalid email address"),
    })

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
    const {
        register: registerForgotPassword,
        handleSubmit: handleSubmitForgotPassword,
        setError,
        formState: { errors: errorsForgotPassword, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmitForgotPassword = async (data: ForgotPasswordFormData) => {
        const { error } = await forgotPassword(data.email);

        if (error) {
            setError("root", {
                message: error instanceof Error ? error.message : "An error occurred while sending the reset link"
            });
        }
    }

    return (
        <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-2xl min-h-[calc(100vh-5rem)]">
            <div className="w-full flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-3 flex">
                    <h1 className="self-stretch text-[#181d27] text-2xl lg:text-3xl font-normal font-merriweather leading-[38px]">
                        Forgot password
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)}
                    className="self-stretch rounded-xl flex-col justify-start items-center gap-6 flex"
                >
                    <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-start gap-5 inline-flex">
                            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-2 inline-flex">
                                <Label htmlFor="email">Email*</Label>
                                <Input
                                    {...registerForgotPassword("email")}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsForgotPassword.email
                                    })}
                                />
                                {errorsForgotPassword.email && (
                                    <p className="text-red-500 text-sm">{errorsForgotPassword.email.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                        <Button type="submit" disabled={isSubmitting} className="px-8 py-3 h-auto w-full">
                            <span className="text-center text-white text-xl font-semibold leading-relaxed">
                                {isSubmitting ? "Sending reset link..." : "Send password reset link"}
                            </span>
                        </Button>
                        {errorsForgotPassword.root && (
                            <div className="self-stretch text-center mt-2">
                                <p className="text-red-500 text-sm">{errorsForgotPassword.root.message}</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
