import type React from "react";

export default function CompanyLayout({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="m-auto max-w-screen-2xl space-y-8 px-16 py-14">
      <h1 className="font-merriweather text-[2.5rem]">{title}</h1>
      <div className="prose prose-lg min-w-full space-y-4">{children}</div>
    </div>
  );
}
