import BookingTabs from "@/components/booking/tabs";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto max-w-screen-2xl px-4 lg:px-16 pt-4 lg:pt-16 py-8 space-y-6">
      <h1 className="text-[2.5rem] font-merriweather">Your bookings</h1>
      <BookingTabs />
      {children}
    </div>
  );
}