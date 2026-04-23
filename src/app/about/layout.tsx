import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Oscar Mulele | The Journey & The Music",
  description: "Learn more about Oscar Mulele's journey as a professional saxophonist in Kampala. Discover the passion, experience, and soul behind the music.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
