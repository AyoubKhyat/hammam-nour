"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SoundToggle from "./SoundToggle";
import WhatsAppButton from "./WhatsAppButton";
import { LanguageProvider } from "@/lib/i18n";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
      <Footer />
      <SoundToggle />
      <WhatsAppButton />
    </LanguageProvider>
  );
}
