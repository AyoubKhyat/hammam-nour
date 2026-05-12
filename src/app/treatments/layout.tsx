import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments & Rituals",
  description: "Explore our traditional Moroccan hammam rituals, massages, facials, and body wraps. Each treatment uses 100% natural ingredients and ancient techniques.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
