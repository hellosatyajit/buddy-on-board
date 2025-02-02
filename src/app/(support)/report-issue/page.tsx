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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const issueSchema = z
    .object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email address"),
        category: z.string().min(1, "Category is required"),
        message: z.string().min(1, "Message is required"),
        attachment: z.any().optional(),
        requestCallback: z.boolean().optional(),
        stayAnonymous: z.boolean().optional(),
        agreeToTerms: z.boolean(),
    })

type IssueFormData = z.infer<typeof issueSchema>

export default function ReportIssuePage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    })

    const onSubmit = async (data: IssueFormData) => {
        console.log("Request submitted", data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const getErrorMessage = (errors: any) => {
        const errorKeys = Object.keys(errors)
        if (errorKeys.length === 5) {
            return "Please enter all fields correctly."
        } else if (errorKeys.length > 0) {
            return errors[errorKeys[0]].message
        }
        return null
    }

    const errorMessageAdditionalInfo = getErrorMessage(errors)

    return (
        <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-2xl min-h-[calc(100vh-5rem)]">
            <div className="w-full flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-3 flex">
                    <h1 className="self-stretch text-[#181d27] text-3xl font-normal font-['Merriweather'] leading-[38px]">
                        Report an issue
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="self-stretch rounded-xl flex-col justify-start items-center gap-6 flex"
                >
                    <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-start gap-5 inline-flex flex-col sm:flex-row">
                            <div className="w-full justify-start items-start gap-2 inline-flex flex-col">
                                <Label htmlFor="fullName">Full Name*</Label>
                                <Input {...register("fullName")} id="fullName" placeholder="Enter your full name" className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                    "border-red-500": errors.fullName
                                })} />
                            </div>
                            <div className="w-full justify-start items-start gap-2 inline-flex flex-col">
                                <Label htmlFor="email">Email*</Label>
                                <Input {...register("email")} type="email" id="email" placeholder="Enter your email" className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                    "border-red-500": errors.email
                                })} />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-5 inline-flex flex-col sm:flex-row">
                            <div className="w-full justify-start items-start gap-2 inline-flex flex-col">
                                <Label htmlFor="category">Type of issue*</Label>
                                <Select {...register("category")}>
                                    <SelectTrigger id="category" className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errors.category
                                    })}>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="feature">Feature Request</SelectItem>
                                        <SelectItem value="bug">Bug Report</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full justify-start items-start gap-2 inline-flex flex-col">
                                <Label htmlFor="attachment">Upload an Attachment</Label>
                                <Input type="file" {...register("attachment")} id="attachment" className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                    "border-red-500": errors.attachment
                                })} />
                            </div>
                        </div>

                        <div className="self-stretch space-y-2">
                            <Label htmlFor="message">Your Message*</Label>
                            <Textarea {...register("message")} id="message" placeholder="Enter your message" className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                "border-red-500": errors.message
                            })} />
                        </div>
                        <div className="self-stretch justify-start items-center gap-3 inline-flex">
                            <Checkbox
                                {...register("requestCallback")}
                                id="requestCallback"
                                className="w-5 h-5" />
                            <Label htmlFor="requestCallback" className="grow shrink basis-0">
                                Request a call-back
                            </Label>
                        </div>
                        <div className="self-stretch justify-start items-center gap-3 inline-flex">
                            <Checkbox
                                {...register("stayAnonymous")}
                                id="stayAnonymous"
                                className="w-5 h-5" />
                            <Label htmlFor="stayAnonymous" className="grow shrink basis-0">
                                I prefer to remain anonymous (if selected, your personal information will not be shared or visible to our support team).
                            </Label>
                        </div>
                        <div className="self-stretch justify-start items-center gap-3 inline-flex">
                            <Checkbox
                                {...register("agreeToTerms")}
                                id="agreeToTerms"
                                className="w-5 h-5" />
                            <Label htmlFor="agreeToTerms" className="grow shrink basis-0">
                                <span className="text-[#535862] text-sm font-normal leading-5">
                                    I have read and agree to the{" "}
                                </span>
                                <Link href="/terms-of-use" className="text-primary text-sm font-bold leading-5 pr-1">
                                    Terms of Use
                                </Link>
                                <span className="text-[#535862] text-sm font-normal leading-[18.20px]">and </span>
                                <Link href="/privacy-policy" className="text-primary text-sm font-bold leading-5">
                                    Privacy Policy
                                </Link>
                                <span className="text-[#535862] text-sm font-normal leading-[18.20px]">
                                    . I understand that agreeing to the Terms is required to complete my registration and use the
                                    services.
                                </span>
                            </Label>
                        </div>

                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                        <Button type="submit" disabled={isSubmitting} className="px-8 py-3 h-auto w-full">
                            <span className="text-center text-white text-xl font-semibold leading-relaxed">
                                {isSubmitting ? "Sending Message..." : "Send Message"}
                            </span>
                        </Button>
                        {errorMessageAdditionalInfo && (
                            <div className="text-center self-stretch mt-2">
                                <p className="text-red-500 text-sm">{errorMessageAdditionalInfo}</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}