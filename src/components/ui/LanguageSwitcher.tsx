"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { localeNames, type Locale } from "@/lib/translations";

const locales: Locale[] = ["en", "fr", "ar"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-ivory/70 hover:text-ivory text-xs tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-1.5"
      >
        {localeNames[locale]}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 bg-charcoal/95 backdrop-blur-sm border border-ivory/10 rounded-lg overflow-hidden min-w-[60px]">
          {locales
            .filter((l) => l !== locale)
            .map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-xs tracking-[0.15em] text-ivory/60 hover:text-ivory hover:bg-ivory/5 transition-colors duration-200 text-center"
              >
                {localeNames[l]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
