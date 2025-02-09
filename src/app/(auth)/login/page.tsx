"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "@/actions/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    setError,
    formState: { errors: errorsLogin, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    const { error } = await signIn(data);

    if (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while sending the reset link",
      });
    }
  };

  const getErrorMessage = (errors: any) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 3) {
      return "Please enter all fields correctly.";
    } else if (errorKeys.length > 0) {
      return errors[errorKeys[0]].message;
    }
    return null;
  };

  const errorMessageSignUp = getErrorMessage(errorsLogin);

  return (
    <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-2xl min-h-[calc(100vh-5rem)]">
      <div className="w-full flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 inline-flex">
        <div className="self-stretch flex-col justify-start items-center gap-3 flex">
          <h1 className="self-stretch text-[#181d27] text-2xl lg:text-3xl font-normal font-merriweather leading-[38px]">
            Log in
          </h1>
        </div>
        <form
          onSubmit={handleSubmitLogin(onSubmitLogin)}
          className="self-stretch rounded-xl flex-col justify-start items-center gap-6 flex"
        >
          <div className="self-stretch flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-1.5 inline-flex">
                <Label htmlFor="email">Email*</Label>
                <Input
                  {...registerLogin("email")}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={cn(
                    "leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                    {
                      "border-red-500": errorsLogin.email,
                    },
                  )}
                />
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                  <Label htmlFor="password">Password*</Label>
                  <Input
                    {...registerLogin("password")}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={cn(
                      "leading-snug focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                      {
                        "border-red-500": errorsLogin.password,
                      },
                    )}
                  />
                </div>
                <div className="self-stretch text-[#535862] text-sm font-normal leading-tight">
                  <Link
                    href="/forgot-password"
                    className="text-sm leading-tight hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 h-auto w-full"
            >
              <span className="text-center text-white text-xl font-semibold leading-relaxed">
                {isSubmitting ? "Logging in..." : "Log In"}
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
          <p className="text-[#535862] text-sm font-normal font-['Inter'] leading-tight">
            Don't have an account?
          </p>
          <div className="justify-start items-start flex">
            <div className="justify-center items-center gap-2 flex">
              <Link
                href="/signup"
                className="text-primary text-sm font-semibold leading-tight hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
