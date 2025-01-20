import type { Metadata } from "next";
import { Merriweather, DM_Sans } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: "400",
});

const DMSans = DM_Sans({
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Buddy On Board",
  description: "Travel Smarter, Together: Companions & Deliveries Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${DMSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
