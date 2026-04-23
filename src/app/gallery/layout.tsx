import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery & Performances | Oscar Mulele",
  description: "Browse photos and videos of Oscar Mulele's live performances at weddings, corporate events, and intimate shows across Kampala.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
