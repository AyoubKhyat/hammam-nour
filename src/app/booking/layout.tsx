import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Reserve your hammam ritual, massage, or spa treatment at Hammam Nour. Choose your preferred date, time, and treatment for the ultimate Moroccan wellness experience.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
