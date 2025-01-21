"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Search() {
  const [searchType, setSearchType] = useState<"travel" | "courier">("travel");
  return (
    <div className="m-auto max-w-screen-2xl space-y-5 px-16 pb-16">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-white text-xl">
          I am looking for:{" "}
        </span>
        <div
          className="flex w-fit gap-2 rounded-full bg-white/60 p-1"
          data-asd={searchType}
        >
          <Button
            className={cn("rounded-full", {
              "bg-black text-white": searchType === "travel",
            })}
            variant="ghost"
            onClick={() => setSearchType("travel")}
          >
            A Travel Buddy
          </Button>
          <Button
            className={cn("rounded-full", {
              "bg-black text-white": searchType === "courier",
            })}
            variant="ghost"
            onClick={() => setSearchType("courier")}
          >
            A Buddy Courier{" "}
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 rounded-lg bg-white px-8 py-2"></div>
        <Button className="h-auto px-8 py-2 text-xl">
          <span className="leading-7">Search</span>
        </Button>
      </div>
    </div>
  );
}
