import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-4 p-16">
      <h1 className="font-merriweather text-5xl">Oops! 404 Error</h1>
      <p className="text-base">
        Well, this is awkward. Looks like you need a travel buddy to guide you
        back to the homepage safely.
      </p>
    </div>
  );
}
