import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/constants/faq";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FAQs() {
  return (
    <div className="space-y-8 px-4 md:px-2 pt-8 md:pt-16 pb-16 md:pb-32">
      <h2 className="text-xl md:text-[2.5rem] font-merriweather text-center">
        Some frequently asked questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="m-auto w-full max-w-4xl space-y-2 md:space-y-4"
        defaultValue="1"
      >
        {faqs
          .filter((faq) => faq.category === "General")
          .map((item) => (
            <AccordionItem
              value={item.id.toString()}
              key={item.id}
              className="px-5 py-4 bg-[#CEDAF3] data-[state=open]:bg-[#E1E9F7] rounded-lg"
            >
              <AccordionTrigger className="p-0 text-[15px] font-semibold text-[#595959] hover:no-underline ">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="p-0 pt-2 text-[#737070]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>

      <Button
        variant="default"
        className="block w-fit m-auto h-auto px-8 py-4"
        asChild
      >
        <Link href="/" className="font-semibold text-xl leading-6">
          Explore more FAQs
        </Link>
      </Button>
    </div>
  );
}
