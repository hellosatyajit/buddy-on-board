"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAirports } from "@/actions/airport";

interface Airport {
  iata_code: string;
  name: string;
}

export function AirportSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [airports, setAirports] = useState<Airport[]>([]);

  const debouncedSearch = useDebouncedCallback((searchTerm: string) => {
    if (searchTerm.length > 1) {
      fetchAirports(searchTerm);
    } else {
      setAirports([]);
    }
  }, 300);

  const fetchAirports = async (searchTerm: string) => {
    const response = await getAirports(searchTerm);
    console.log(response.data);

    const data = response.data;
    setAirports(data);
  };

  useEffect(() => {
    if (open) {
      debouncedSearch(value);
    }
  }, [open, value, debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          id="airport"
          className="w-full bg-red-500 border-none p-0 focus-visible:ring-transparent rounded-none h-auto"
          placeholder="Add an airport"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => setOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search airports..."
            value={value}
            onValueChange={(search) => {
              setValue(search);
              debouncedSearch(search);
            }}
            className=""
          />
          <CommandList>
            <CommandEmpty>No airports found.</CommandEmpty>
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.iata_code}
                  onSelect={() => {
                    setValue(airport.name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {airport.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
