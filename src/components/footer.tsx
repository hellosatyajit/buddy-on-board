import Link from "next/link";

const FOOTER_ITEMS = [
  {
    label: "How it works",
    href: "#",
  },
  {
    label: "About Us",
    href: "#",
  },
  {
    label: "Report issue",
    href: "#",
  },
  {
    label: "Submit Service Request",
    href: "#",
  },
  {
    label: "Help",
    href: "#",
  },
];

const COMPANY_ITEMS = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    href: "/terms-of-service",
  },
  {
    label: "Cookies Settings",
    href: "#",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="m-auto max-w-screen-2xl p-4 md:p-6 text-white">
      <div
        className="space-y-10 md:space-y-20 rounded-2xl bg-primary px-6 md:px-12 py-8 md:py-14 md:pb-16"
        style={{
          backgroundImage: "url(./blue-bg.png)",
          backgroundSize: "cover",
        }}
      >
        <div className="space-y-14">
          <Link href="/" className="font-bold text-2xl text-white">
            <img src="./logo.svg" alt="logo" className="h-10 md:h-20" />
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            {FOOTER_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium md:font-bold text-xs md:text-xl"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <hr className="hidden md:block" />
        <div className="flex md:items-center 2xl:justify-between flex-col 2xl:flex-row">
          <div className="order-2 2xl:order-1 md:pt-6 2xl:p-0">
            <hr className="block md:hidden pt-4 mt-4" />
            <p className="text-sm md:text-xl text-center">
              {year} Buddy on board. All rights reserved. Trademark registration
              in progress.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 order-1 2xl:order-2">
            {COMPANY_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="font-medium md:font-bold text-xs md:text-xl">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
