"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale } from "./translations";

interface I18nContext {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<I18nContext>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, mounted]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[locale];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return (value as string) || key;
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Ctx.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLocale() {
  return useContext(Ctx);
}

export function T({ k }: { k: string }) {
  const { t } = useLocale();
  return <>{t(k)}</>;
}

export function TRich({
  k,
  as: Tag = "span",
  className,
}: {
  k: string;
  as?: "span" | "h2" | "p" | "div";
  className?: string;
}) {
  const { t } = useLocale();
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}
