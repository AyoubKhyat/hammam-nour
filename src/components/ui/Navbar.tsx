"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  { href: "/about", label: "Our Story" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/booking", label: "Book Now" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="relative z-50">
          <h1 className="font-playfair text-2xl tracking-[0.2em] text-ivory uppercase">
            Hammam Nour
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                link.href === "/booking"
                  ? "bg-ivory/90 text-charcoal px-6 py-3 hover:bg-ivory"
                  : pathname === link.href
                  ? "text-ivory border-b border-ivory/60 pb-0.5"
                  : "text-ivory/70 hover:text-ivory"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1px] bg-ivory transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-[1px] bg-ivory transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[1px] bg-ivory transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-charcoal z-40 flex items-center justify-center animate-[fadeIn_0.4s_ease]">
          <div className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-playfair text-4xl tracking-[0.1em] transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-ivory"
                    : "text-ivory/40 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
