import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface NotificationEmailProps {
  title: string;
  message: string;
  actionUrl?: string;
}

export const NotificationEmail = ({
  title,
  message,
  actionUrl,
}: NotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {title}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              {message}
            </Text>
            {actionUrl && (
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={actionUrl}
                >
                  View Details
                </Button>
              </Section>
            )}
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was sent from Buddy on Board. If you'd rather not receive
              these emails, you can{" "}
              <Link href="{{unsubscribe_url}}" className="text-blue-600">
                unsubscribe here
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}; 