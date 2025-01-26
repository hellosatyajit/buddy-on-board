import type { Metadata } from "next";
import { Merriweather, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header";
import Footer from "@/components/footer";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: "400",
  subsets: ["latin"],
});

const DMSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
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
        className={`${merriweather.variable} ${DMSans.variable} font-sans antialiased bg-[#F5F5F5]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
