"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface Ripple {
  x: number;
  y: number;
  r: number;
  o: number;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef(0);
  const lastRipple = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current)
        bgRef.current.style.transform = `translateY(${y * 0.35}px)`;
      if (titleRef.current)
        titleRef.current.style.transform = `translateY(${y * 0.15}px) scale(${1 + y * 0.00012})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (e.clientY > rect.bottom || e.clientY < rect.top) return;
      if (e.clientX > rect.right || e.clientX < rect.left) return;
      const now = Date.now();
      if (now - lastRipple.current < 80) return;
      lastRipple.current = now;
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0,
        o: 0.2,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter((rip) => rip.o > 0.003);
      for (const rip of ripplesRef.current) {
        rip.r += 1.8;
        rip.o *= 0.965;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(250,247,242,${rip.o})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (rip.r > 12) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(250,247,242,${rip.o * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (rip.r > 25) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(196,83,42,${rip.o * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouse);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] flex items-end overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/hero-spa.jpg')",
          height: "120%",
          top: "-10%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      <div className="absolute inset-3 sm:inset-4 md:inset-6 border border-ivory/15 rounded-lg pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        style={{ mixBlendMode: "overlay" }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4">
        <h1
          ref={titleRef}
          className="font-playfair text-[15vw] sm:text-[14vw] md:text-[12vw] leading-[0.85] text-ivory text-center tracking-tight drop-shadow-[0_4px_40px_rgba(0,0,0,0.4)] will-change-transform"
          style={{ animation: "heroTitle 1.5s 0.2s both" }}
        >
          HAMMAM
          <br />
          NOUR
        </h1>
      </div>

      <div className="relative z-10 w-full px-5 sm:px-6 md:px-16 pb-8 sm:pb-12 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
          <div className="max-w-md animate-[slideUp_1s_0.8s_both]">
            <p className="text-ivory/80 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              A sanctuary of ancient Moroccan wellness in the heart of
              Marrakesh, where warmth, steam and tradition restore your spirit.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-ivory text-charcoal px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-terracotta hover:text-ivory transition-colors duration-500 group"
            >
              Sign up online
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="hidden md:flex gap-12 text-right animate-[fadeIn_1s_1.2s_both]">
            <div>
              <p className="text-ivory/40 text-xs tracking-[0.2em] uppercase mb-1">
                Phone
              </p>
              <p className="text-ivory/80 text-sm">+212 524 389 100</p>
            </div>
            <div>
              <p className="text-ivory/40 text-xs tracking-[0.2em] uppercase mb-1">
                Location
              </p>
              <p className="text-ivory/80 text-sm">Medina, Marrakesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
