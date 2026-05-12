"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function CandleFlame() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" className="inline-block">
      <rect x="8" y="20" width="4" height="12" fill="#e8d5b7" rx="1" />
      <motion.path
        d="M10 2 C10 2, 4 10, 4 15 C4 19, 7 21, 10 21 C13 21, 16 19, 16 15 C16 10, 10 2, 10 2Z"
        fill="#c4532a"
        animate={{
          d: [
            "M10 2 C10 2, 4 10, 4 15 C4 19, 7 21, 10 21 C13 21, 16 19, 16 15 C16 10, 10 2, 10 2Z",
            "M10 3 C10 3, 5 11, 5 15 C5 18, 7 20, 10 20 C13 20, 15 18, 15 15 C15 11, 10 3, 10 3Z",
            "M10 1 C10 1, 3 10, 3 15 C3 19, 7 22, 10 22 C13 22, 17 19, 17 15 C17 10, 10 1, 10 1Z",
            "M10 2 C10 2, 4 10, 4 15 C4 19, 7 21, 10 21 C13 21, 16 19, 16 15 C16 10, 10 2, 10 2Z",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M10 8 C10 8, 7 12, 7 14 C7 16, 8.5 17, 10 17 C11.5 17, 13 16, 13 14 C13 12, 10 8, 10 8Z"
        fill="#e8d5b7"
        animate={{ opacity: [0.8, 1, 0.7, 0.9, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function ZelligeBorder() {
  return (
    <div className="w-full h-8 flex justify-center overflow-hidden">
      <svg width="100%" height="32" className="opacity-20">
        <pattern id="zellige-footer" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M16 0 L32 16 L16 32 L0 16Z" fill="none" stroke="#c4532a" strokeWidth="0.5" />
          <circle cx="16" cy="16" r="4" fill="none" stroke="#c4532a" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#zellige-footer)" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <ZelligeBorder />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h2 className="font-playfair text-3xl tracking-[0.15em] mb-4">
              Hammam Nour
            </h2>
            <p className="text-sand/70 text-sm leading-relaxed mb-6">
              A sanctuary of ancient Moroccan wellness in the heart of Marrakesh.
            </p>
            <CandleFlame />
          </div>

          <div>
            <h3 className="font-playfair text-lg mb-6 text-terracotta">Visit</h3>
            <div className="space-y-3 text-sm text-sand/70">
              <p>42 Derb El Hammam</p>
              <p>Medina, Marrakesh</p>
              <p>Morocco</p>
              <p className="pt-2">+212 524 389 100</p>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg mb-6 text-terracotta">Hours</h3>
            <div className="space-y-3 text-sm text-sand/70">
              <p>Monday — Friday</p>
              <p>9:00 — 21:00</p>
              <p className="pt-2">Saturday — Sunday</p>
              <p>8:00 — 22:00</p>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg mb-6 text-terracotta">Explore</h3>
            <div className="space-y-3">
              {[
                { href: "/treatments", label: "Treatments" },
                { href: "/booking", label: "Book a Session" },
                { href: "/about", label: "Our Story" },
                { href: "/gift-cards", label: "Gift Cards" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-sand/70 hover:text-terracotta transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sand/40 text-xs tracking-wider">
            &copy; 2008 — {new Date().getFullYear()} Hammam Nour. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "WhatsApp"].map((social) => (
              <span
                key={social}
                className="text-xs tracking-wider text-terracotta/60 hover:text-terracotta transition-colors duration-300 cursor-pointer"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
