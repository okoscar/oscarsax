import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Oscar Mulele | Professional Saxophonist & Bandleader in Kampala",
  description: "Experience soulful live music for weddings, corporate events, and private parties in Kampala. Oscar Mulele brings elegance and rhythm to every occasion.",
  keywords: "Oscar Mulele, Saxophonist, Live Music Kampala, Wedding Music Uganda, Corporate Events Music, Jazz Uganda",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans selection:bg-[#FFB800] selection:text-black">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}