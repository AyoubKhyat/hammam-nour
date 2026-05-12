import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ui/ClientLayout";

const ragas = localFont({
  src: [
    {
      path: "../../public/fonts/ragas.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ragas.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ragas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hammam Nour — Moroccan Spa & Wellness | Marrakesh",
  description:
    "A sanctuary of ancient Moroccan wellness in the heart of Marrakesh. Traditional hammam rituals, massages, facials, and body wraps performed by master therapists.",
  keywords: ["hammam", "spa", "marrakesh", "moroccan", "wellness", "massage", "ritual"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ragas.variable} ${dmSans.variable} font-sans antialiased bg-cream`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
