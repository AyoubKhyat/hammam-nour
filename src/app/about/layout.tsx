import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "For 17 years, Hammam Nour has been a sanctuary of ancient Moroccan wellness in Marrakesh. Meet our master therapists and discover our philosophy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
