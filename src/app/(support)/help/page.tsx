"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, MessageCircleIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpPage() {
  const [searchType, setSearchType] = useState<"general" | "buddies">(
    "general",
  );
  return (
    <div className="px-4 py-8 md:px-16 lg:py-14 2xl:py-16 m-auto max-w-screen-2xl space-y-14">
      <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-2">
        <div className="flex-1 flex flex-col justify-start items-start gap-4 sm:gap-6">
          <h1 className="text-[#090909] text-3xl md:text-[42px] font-normal font-merriweather leading-tight">
            How can we help you today?
          </h1>
          <div className="relative w-full max-w-sm">
            <Input
              type="text"
              placeholder="Search your concern"
              className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon className="w-5 h-5 text-[#cecece] flex-shrink-0" />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/report-issue"
            className="w-full sm:w-auto p-3 sm:p-4 2xl:py-8 bg-white rounded-2xl shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] flex flex-row sm:flex-col justify-start items-start gap-2 sm:gap-3"
          >
            <AlertCircleIcon className="w-4 h-4 sm:w-8 sm:h-8" />
            <span className="text-[#090909] text-sm md:text-base 2xl:text-2xl font-semibold leading-tight tracking-tight">
              Report issue
            </span>
          </Link>
          <Link
            href="/request-issue"
            className="w-full sm:w-auto p-3 sm:p-4 2xl:py-8 bg-white rounded-2xl shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] flex flex-row sm:flex-col justify-start items-start gap-2 sm:gap-3"
          >
            <MessageCircleIcon className="w-4 h-4 sm:w-8 sm:h-8" />
            <span className="text-[#090909] text-sm md:text-base 2xl:text-2xl font-semibold leading-tight tracking-tight">
              Provide Feedback
            </span>
          </Link>
        </div>
      </div>
      <div className="space-y-8">
        <div
          className="group flex w-fit gap-2 rounded-full bg-white/60 p-1"
          data-type={searchType}
        >
          <Button
            className="group-data-[type=general]:bg-black group-data-[type=general]:text-white rounded-full"
            variant="ghost"
            onClick={() => setSearchType("general")}
          >
            General FAQs
          </Button>
          <Button
            className="group-data-[type=buddies]:bg-black group-data-[type=buddies]:text-white rounded-full"
            variant="ghost"
            onClick={() => setSearchType("buddies")}
          >
            FAQs for buddies
          </Button>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[...Array(6)].map((_, index) => (
            <Link
              key={index}
              href="/help/travel-safe"
              className="w-full px-4 pt-4 pb-8 bg-white rounded-lg shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] flex flex-col justify-start items-center gap-4"
            >
              <div className="w-full aspect-[374/240] rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://via.placeholder.com/374x240"
                  alt="Article thumbnail"
                />
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full flex flex-col justify-center items-start gap-2">
                  <div className="w-full text-neutral-700 text-xs sm:text-base font-normal">
                    June 15, 2024
                  </div>
                  <h2 className="w-full text-[#090909] text-xl font-normal font-merriweather">
                    Traveling Safely: A Comprehensive Guide
                  </h2>
                  <p className="w-full text-[#090909] text-sm sm:text-base font-light">
                    Have you considered why safety is a priority during your
                    travels?
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
