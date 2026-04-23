import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music & Discography | Oscar Mulele",
  description: "Listen to the soulful saxophone covers and original releases by Oscar Mulele. Discover a unique blend of jazz, soul, and contemporary rhythms.",
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
