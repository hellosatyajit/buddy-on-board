"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const signUpSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpForm() {

    const {
        register: registerSignUp,
        handleSubmit: handleSubmitSignUp,
        formState: { errors: errorsSignUp, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmitSignUp = async (data: SignUpFormData) => {
        console.log("Form submitted", data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const getErrorMessage = (errors: any) => {
        const errorKeys = Object.keys(errors)
        if (errorKeys.length === 3) {
            return "Please enter all fields correctly."
        } else if (errorKeys.length > 0) {
            return errors[errorKeys[0]].message
        }
        return null
    }

    const errorMessageSignUp = getErrorMessage(errorsSignUp)

    return (
        <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-2xl min-h-[calc(100vh-5rem)]">
            <div className="w-full flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-3 flex">
                    <h1 className="self-stretch text-[#181d27] text-3xl font-normal font-['Merriweather'] leading-[38px]">
                        Sign up
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmitSignUp(onSubmitSignUp)}
                    className="self-stretch rounded-xl flex-col justify-start items-center gap-6 flex"
                >
                    <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-start gap-5 inline-flex">
                            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-2 inline-flex">
                                <Label htmlFor="email">Email*</Label>
                                <Input {...registerSignUp("email")} type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsSignUp.email
                                    })} />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-5 inline-flex flex-col sm:flex-row">
                            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                                    <Label htmlFor="confirmPassword">Password*</Label>
                                    <Input
                                        {...registerSignUp("password")}
                                        type="password"
                                        id="password"
                                        placeholder="Create a password"
                                        className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                            "border-red-500": errorsSignUp.password
                                        })} />
                                </div>
                                <div className="self-stretch text-[#535862] text-sm font-normal leading-tight">
                                    Must be at least 8 characters.
                                </div>
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                                <Label htmlFor="confirmPassword">Confirm Password*</Label>
                                <Input
                                    {...registerSignUp("confirmPassword")}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsSignUp.confirmPassword
                                    })} />
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                        <Button type="submit" disabled={isSubmitting} className="px-8 py-3 h-auto w-full">
                            <span className="text-center text-white text-xl font-semibold leading-relaxed">
                                {isSubmitting ? "Creating account..." : "Create your account"}
                            </span>
                        </Button>
                        {errorMessageSignUp && (
                            <div className="text-center self-stretch mt-2">
                                <p className="text-red-500 text-sm">{errorMessageSignUp}</p>
                            </div>
                        )}
                    </div>
                </form>
                <div className="self-stretch justify-center items-center gap-1 inline-flex">
                    <p className="text-[#535862] text-sm font-normal font-['Inter'] leading-tight">Already have an account?</p>
                    <div className="justify-start items-start flex">
                        <div className="justify-center items-center gap-2 flex">
                            <Link href="/login" className="text-primary text-sm font-semibold leading-tight hover:underline">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

