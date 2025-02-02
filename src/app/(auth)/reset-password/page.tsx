"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const newPasswordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

type NewPasswordFormData = z.infer<typeof newPasswordSchema>

export default function NewPasswordForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const {
        register: registerNewPassword,
        handleSubmit: handleSubmitNewPassword,
        formState: { errors: errorsNewPassword, isSubmitting },
    } = useForm<NewPasswordFormData>({
        resolver: zodResolver(newPasswordSchema),
    })

    const onSubmitNewPassword = async (data: NewPasswordFormData) => {
        try {
            console.log("Form submitted", data)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Password updated")
        } catch (error) {
            setErrorMessage("Failed to update password. Please try again.")
        }
    }

    return (
        <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-2xl min-h-[calc(100vh-5rem)]">
            <div className="w-full flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-3 flex">
                    <h1 className="self-stretch text-[#181d27] text-3xl font-normal font-['Merriweather'] leading-[38px]">
                        Create new password
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}
                    className="self-stretch rounded-xl flex-col justify-start items-center gap-6 flex"
                >
                    <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-start gap-5 inline-flex">
                            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-1.5 inline-flex">
                                <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                                    <Label htmlFor="password">Password*</Label>
                                    <Input {...registerNewPassword("password")} type="password"
                                        id="password"
                                        placeholder="Create a new password"
                                        className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                            "border-red-500": errorsNewPassword.password
                                        })} />
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-5 inline-flex">
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                                    <Label htmlFor="confirmPassword">Confirm Password*</Label>
                                    <Input
                                        {...registerNewPassword("confirmPassword")}
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm new password"
                                        className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                            "border-red-500": errorsNewPassword.confirmPassword
                                        })} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                        <Button type="submit" disabled={isSubmitting} className="px-8 py-3 h-auto w-full">
                            <span className="text-center text-white text-xl font-semibold leading-relaxed">
                                {isSubmitting ? "Updating password..." : "Update password"}
                            </span>
                        </Button>
                        {errorMessage && (
                            <div className="text-center self-stretch mt-2">
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div >
    )
}
