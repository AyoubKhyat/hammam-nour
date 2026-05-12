"use client";

import { useState, useRef, useEffect } from "react";

const galleryImages = [
  { image: "/gallery-1.jpg", label: "The Hammam Chamber" },
  { image: "/gallery-2.jpg", label: "Argan Oil Ritual" },
  { image: "/gallery-3.jpg", label: "Copper & Steam" },
  { image: "/gallery-4.jpg", label: "Zellige Details" },
  { image: "/gallery-5.jpg", label: "Rose Water Ceremony" },
  { image: "/gallery-6.jpg", label: "The Relaxation Room" },
];

export default function GalleryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows);
    updateArrows();
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="snap-start flex-shrink-0 w-[300px] md:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden relative group"
          >
            <img
              src={img.image}
              alt={img.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-ivory text-sm tracking-[0.15em]">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollLeft
              ? "border-charcoal/30 text-charcoal hover:border-terracotta hover:text-terracotta"
              : "border-charcoal/10 text-charcoal/20 cursor-not-allowed"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollRight
              ? "border-charcoal/30 text-charcoal hover:border-terracotta hover:text-terracotta"
              : "border-charcoal/10 text-charcoal/20 cursor-not-allowed"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
