import CTA from "@/components/home/cta";
import FAQs from "@/components/home/faq";
import Search from "@/components/home/search";
import UsersSlider from "@/components/home/users-slider";
import Working from "@/components/home/working";

export default function Home() {
  return (
    <>
      <div className="relative">
        <main className="space-y-16">
          <h1 className="m-auto max-w-screen-2xl px-16 pt-16 font-merriweather text-6xl text-white">
            Travel Smarter, Together: Companions & Deliveries Made Easy
          </h1>
          <div className="bg-gradient-to-b from-transparent to-[#F5F5F5]">
            <Search />
          </div>
        </main>
        <div
          className="-top-20 -z-10 absolute inset-0"
          style={{
            backgroundImage: "url(./background.png)",
            backgroundSize: "cover",
          }}
        />
      </div>
      <UsersSlider />
      <Working />
      <CTA />
      <FAQs />
    </>
  );
}
