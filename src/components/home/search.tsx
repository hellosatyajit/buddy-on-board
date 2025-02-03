"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { getAirports } from "@/actions/airport";
import SingleSelector from "../ui/singleselect";
import DatePicker from "../ui/date-picker";
import { Skeleton } from "../ui/skeleton";

export default function Search() {
  const [searchType, setSearchType] = useState<"travel" | "courier">("travel");
  const [from, setFrom] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });
  const [to, setTo] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });
  const [packageType, setPackageType] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="m-auto max-w-screen-2xl space-y-5 px-5 lg:px-16">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <span className="font-semibold text-white text-sm md:text-xl">
          I am looking for:{" "}
        </span>
        <div
          className="group flex w-fit gap-2 rounded-full bg-white/60 p-1 text-sm sm:text-base"
          data-type={searchType}
        >
          <Button
            className="group-data-[type=travel]:bg-black group-data-[type=travel]:text-white rounded-full h-8 md:h-10"
            variant="ghost"
            onClick={() => setSearchType("travel")}
          >
            A Travel Buddy
          </Button>
          <Button
            className="group-data-[type=courier]:bg-black group-data-[type=courier]:text-white rounded-full h-8 md:h-10"
            variant="ghost"
            onClick={() => setSearchType("courier")}
          >
            A Buddy Courier{" "}
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <div className="flex-1 rounded-2xl bg-transparent lg:bg-white lg:px-8 lg:py-2 flex text-sm flex-col lg:flex-row gap-2">
          <div className="flex-1 bg-white lg:bg-transparent rounded-2xl px-4 py-2 lg:p-0 flex flex-row">
            <div className="flex-1 relative">
              <label htmlFor="from" className="uppercase block">
                From
              </label>
              <SingleSelector
                value={from}
                onChange={(value) => setFrom(value)}
                onSearch={async (value) => {
                  const res = await getAirports(value);
                  return res.data.map((airport) => ({
                    label: airport.name,
                    value: airport.iata_code,
                  }));
                }}
                placeholder="Add an airport"
                loadingIndicator={
                  <div className="space-y-1">
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                  </div>
                }
                emptyIndicator={
                  <p className="w-full text-center text-sm leading-10 text-muted-foreground">
                    {from.value
                      ? "No airport found."
                      : "Search to find an airport."}
                  </p>
                }
              />
            </div>
            <div className="flex-1 pl-4 lg:pl-16 lg:pr-4 border-l">
              <label htmlFor="to" className="uppercase block">
                To
              </label>
              <SingleSelector
                value={to}
                onChange={(value) => setTo(value)}
                onSearch={async (value) => {
                  const res = await getAirports(value);
                  return res.data.map((airport) => ({
                    label: airport.name,
                    value: airport.iata_code,
                  }));
                }}
                placeholder="Add an airport"
                loadingIndicator={
                  <div className="space-y-1">
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                  </div>
                }
                emptyIndicator={
                  <p className="w-full text-center text-sm leading-10 text-muted-foreground">
                    {to.value
                      ? "No airport found."
                      : "Search to find an airport."}
                  </p>
                }
              />
            </div>
          </div>
          <div className="flex-1 bg-white lg:bg-transparent rounded-2xl px-4 py-2 lg:p-0 flex flex-row">
            <div className="flex-1 lg:pl-16 lg:border-l">
              <label htmlFor="date" className="uppercase">
                Date
              </label>
              <DatePicker date={date} setDate={setDate} />
            </div>
            {searchType === "courier" && (
              <div className="flex-1 pl-4 lg:pl-16 border-l">
                <label htmlFor="date" className="uppercase">
                  TYPE OF PACKAGE
                </label>
                <SingleSelector
                  value={packageType}
                  onChange={(value) => setPackageType(value)}
                  defaultOptions={[
                    { label: "Documents", value: "documents" },
                    { label: "Small Package", value: "small_package" },
                    { label: "Medium Package", value: "medium_package" },
                    { label: "Large Package", value: "large_package" },
                  ]}
                  placeholder="Select your item"
                  emptyIndicator={
                    <p className="w-full text-center text-sm leading-10 text-muted-foreground">
                      No item found.
                    </p>
                  }
                />
              </div>
            )}
          </div>
        </div>
        <Button className="h-auto px-8 py-3 lg:py-2 text-xl" onClick={() => { }}>
          <span className="leading-7">Search</span>
        </Button>
      </div>
    </div>
  );
}
