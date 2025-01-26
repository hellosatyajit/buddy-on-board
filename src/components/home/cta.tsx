import { div } from "motion/react-client";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="max-w-screen-2xl p-16 m-auto text-white">
      <div
        className="bg-primary rounded-2xl p-16 space-y-8"
        style={{
          backgroundImage: "url(./blue-bg.png)",
          backgroundSize: "cover",
        }}
      >
        <div className="space-y-8">
          <h2 className="font-merriweather text-[2.5rem] text-center">
            Our mission is to make travel simpler, safer, and more convenient
            for you and your loved ones!
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-6 justify-start items-start inline-flex">
              {Array.from({ length: 4 }).map((_, index) => (
                <img
                  key={index}
                  className={`w-6 h-6 relative rounded-full translate-x-${6 - index * 2} shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)] border border-white`}
                  src="https://avatar.iran.liara.run/public"
                />
              ))}
            </div>
            <span className="text-2xl">
              500+ travelers have already joined us!
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="block w-fit m-auto h-auto px-8 py-4 bg-white"
          asChild
        >
          <Link
            href="/"
            className="font-semibold text-xl leading-6 text-primary"
          >
            Log in
          </Link>
        </Button>
      </div>
    </div>
  );
}
