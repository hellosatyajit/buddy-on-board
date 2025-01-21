import CompanyLayout from "@/components/layout/company";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanyLayout title="Terms of Service">{children}</CompanyLayout>;
}
