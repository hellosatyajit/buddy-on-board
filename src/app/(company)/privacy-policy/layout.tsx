import CompanyLayout from "@/components/layout/company";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanyLayout title="Privacy Policy">{children}</CompanyLayout>;
}
