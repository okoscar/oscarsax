import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Oscar Mulele | Contact & Inquiries",
  description: "Ready to elevate your event with live music? Contact Oscar Mulele today for booking inquiries, event rates, and availability in Kampala and beyond.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
