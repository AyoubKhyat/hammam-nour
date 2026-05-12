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
  title: {
    default: "Hammam Nour — Moroccan Spa & Wellness | Marrakesh",
    template: "%s | Hammam Nour",
  },
  description:
    "A sanctuary of ancient Moroccan wellness in the heart of Marrakesh. Traditional hammam rituals, massages, facials, and body wraps performed by master therapists.",
  keywords: [
    "hammam", "spa", "marrakesh", "moroccan", "wellness", "massage", "ritual",
    "hammam marrakech", "spa marrakech", "moroccan spa", "traditional hammam",
    "body wraps", "facial treatment", "couples massage", "marrakesh spa",
  ],
  metadataBase: new URL("https://hammam-nour.vercel.app"),
  openGraph: {
    title: "Hammam Nour — Moroccan Spa & Wellness",
    description: "A sanctuary of ancient Moroccan wellness in the heart of Marrakesh. Traditional hammam rituals, massages, and body wraps.",
    url: "https://hammam-nour.vercel.app",
    siteName: "Hammam Nour",
    locale: "en_US",
    type: "website",
    images: [{ url: "/hero-spa.jpg", width: 1200, height: 630, alt: "Hammam Nour Spa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hammam Nour — Moroccan Spa & Wellness",
    description: "A sanctuary of ancient Moroccan wellness in the heart of Marrakesh.",
    images: ["/hero-spa.jpg"],
  },
  alternates: {
    languages: {
      "en": "/",
      "fr": "/",
      "ar": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
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
