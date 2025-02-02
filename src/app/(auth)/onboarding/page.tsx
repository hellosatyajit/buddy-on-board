"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

const additionalInfoSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    phoneNumber: z.string().optional(),
    countryOfResidence: z.string().min(1, "Country of residence is required"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
    }),
})

type AdditionalInfoData = z.infer<typeof additionalInfoSchema>

export default function SignUpForm() {
    const {
        register: registerAdditionalInfo,
        handleSubmit: handleSubmitAdditionalInfo,
        formState: { errors: errorsAdditionalInfo, isSubmitting },
    } = useForm<AdditionalInfoData>({
        resolver: zodResolver(additionalInfoSchema),
    })

    const onSubmitAdditionalInfo = async (data: AdditionalInfoData) => {
        console.log("Additional info submitted", data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Registration complete")
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

    const errorMessageAdditionalInfo = getErrorMessage(errorsAdditionalInfo)

    return (
        <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-4xl min-h-[calc(100vh-5rem)]">
            <div className="w-full flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-3 flex">
                    <h2 className="self-stretch text-[#181d27] text-3xl font-normal font-merriweather leading-[38px]">
                        Tell us a bit more...
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmitAdditionalInfo(onSubmitAdditionalInfo)}
                    className="self-stretch rounded-xl flex-col justify-start items-center gap-6 flex"
                >
                    <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-start flex-col sm:flex-row gap-5 inline-flex">
                            <div className="w-full flex-col justify-start items-start gap-1.5 inline-flex">
                                <Label htmlFor="firstName">
                                    First name*
                                </Label>
                                <Input
                                    {...registerAdditionalInfo("firstName")}
                                    id="firstName"
                                    type="text"
                                    placeholder="Your first name"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsAdditionalInfo.firstName
                                    })}
                                />
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-1.5 inline-flex">
                                <Label htmlFor="middleName">
                                    Middle name
                                </Label>
                                <Input
                                    {...registerAdditionalInfo("middleName")}
                                    id="middleName"
                                    type="text"
                                    placeholder="Your middle name"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsAdditionalInfo.middleName
                                    })}
                                />
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-1.5 inline-flex">
                                <Label htmlFor="lastName" >
                                    Last name*
                                </Label>
                                <Input
                                    {...registerAdditionalInfo("lastName")}
                                    id="lastName"
                                    type="text"
                                    placeholder="Your last name"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsAdditionalInfo.lastName
                                    })}
                                />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-start flex-col sm:flex-row gap-5 inline-flex">
                            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                                <Label htmlFor="dateOfBirth">
                                    Date of birth*
                                </Label>
                                <Input
                                    {...registerAdditionalInfo("dateOfBirth")}
                                    id="dateOfBirth"
                                    type="date"
                                    placeholder="Choose a date"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsAdditionalInfo.dateOfBirth
                                    })}
                                />
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                                <Label htmlFor="phoneNumber">
                                    Phone number
                                </Label>
                                <Input
                                    {...registerAdditionalInfo("phoneNumber")}
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Enter your contact number"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsAdditionalInfo.phoneNumber
                                    })}
                                />
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                                <Label htmlFor="countryOfResidence">
                                    Country of residence
                                </Label>
                                <Input
                                    {...registerAdditionalInfo("countryOfResidence")}
                                    id="countryOfResidence"
                                    type="text"
                                    placeholder="Your country of residence"
                                    className={cn("leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0", {
                                        "border-red-500": errorsAdditionalInfo.countryOfResidence
                                    })}
                                />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-3 inline-flex">
                            <Checkbox
                                {...registerAdditionalInfo("agreeToTerms")}
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
                    <div className="self-stretch h-[50px] flex-col justify-start items-start gap-4 flex">
                        <Button type="submit" disabled={isSubmitting} className="px-8 py-3 h-auto w-full">
                            <span className="text-center text-white text-xl font-semibold leading-relaxed">
                                {isSubmitting ? "Finishing registration..." : "Finish registration"}
                            </span>
                        </Button>
                    </div>
                    {errorMessageAdditionalInfo && (
                        <div className="self-stretch text-center mt-2">
                            <p className="text-red-500 text-sm">{errorMessageAdditionalInfo}</p>
                        </div>
                    )}
                </form>
            </div>
        </div >
    )
}
