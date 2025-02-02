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
        className="space-y-20 rounded-2xl bg-primary px-12 py-14 pb-16"
        style={{
          backgroundImage: "url(./blue-bg.png)",
          backgroundSize: "cover",
        }}
      >
        <div className="space-y-14">
          <Link href="/" className="font-bold text-2xl text-white">
            <img src="./logo.svg" alt="logo" className="h-20" />
          </Link>
          <div className="flex items-center gap-8">
            {FOOTER_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-bold text-xl"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex items-center 2xl:justify-between flex-col 2xl:flex-row">
          <p className="text-xl order-2 2xl:order-1">
            {year} Buddy on board. All rights reserved. Trademark registration
            in progress.
          </p>
          <div className="flex gap-6 order-1 2xl:order-2">
            {COMPANY_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="text-xl">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
