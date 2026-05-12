"use client";

export default function Marquee() {
  const items = [
    "Black soap exfoliation",
    "Kessa scrub",
    "Argan oil massage",
    "Rose water ritual",
    "Ghassoul clay wrap",
    "Hot stone therapy",
    "Eucalyptus steam",
    "Henna art",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-8 bg-terracotta">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-cream/90 text-sm tracking-[0.3em] uppercase font-light"
          >
            {item} <span className="mx-4 text-cream/40">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
