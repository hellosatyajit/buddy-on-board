'use client';
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAVBAR_ITEMS = [
  {
    label: "Become a buddy",
    href: "#",
  },
  {
    label: "How it works",
    href: "#",
  },
  {
    label: "About us",
    href: "#",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="relative">
        <div className="-z-20 absolute inset-0 bg-primary" />
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 lg:px-16 py-4">
          <Link href="/" className="font-bold text-2xl text-white relative z-20 ">
            <img src="./logo.svg" alt="logo" className="h-6" />
          </Link>
          <div className="flex items-center gap-4 2xl:gap-12">
            <div className="items-center order-2 lg:order-1">
              {
                <div className={cn("absolute z-20 p-4 lg:p-0 right-4 top-16 lg:top-0 lg:relative gap-3 lg:gap-9 2xl:gap-12  flex-col lg:flex-row bg-white lg:bg-transparent rounded-xl", {
                  "hidden lg:flex": !isMenuOpen,
                  "flex": isMenuOpen
                })}>
                  {NAVBAR_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block font-normal lg:font-semibold text-base text-black lg:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              }
              <button className="relative z-20 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuIcon color="white" />
              </button>
            </div>
            <Button variant="secondary" className="h-auto px-8 py-2 lg:py-3 order-1 lg:order-2 relative z-20" asChild>
              <Link href="/login" className="block text-sm lg:text-xl leading-6">
                Log in
              </Link>
            </Button>
          </div>
        </nav>
      </header>
      {
        isMenuOpen && <div className="absolute inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>
      }
    </>
  );
}
