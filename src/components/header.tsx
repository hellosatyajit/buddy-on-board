import Link from "next/link";
import { Button } from "./ui/button";

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
  return (
    <header className="relative">
      <div className="-z-20 absolute inset-0 bg-primary" />
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-16 py-4">
        <Link href="/" className="font-bold text-2xl text-white">
          <img src="./logo.svg" alt="logo" className="h-6" />
        </Link>
        <div className="flex items-center gap-12">
          {NAVBAR_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-semibold text-base text-white"
            >
              {item.label}
            </Link>
          ))}
          <Button variant="secondary" className="h-auto px-8 py-3" asChild>
            <Link href="/" className="block text-xl leading-6">
              Log in
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
