import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Give the gift of Moroccan wellness. Purchase Hammam Nour gift cards for hammam rituals, massages, and spa packages in Marrakesh.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
