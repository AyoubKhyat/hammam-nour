"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import HeroSection from "@/components/ui/HeroSection";
import Magnetic from "@/components/ui/Magnetic";
import { useLocale } from "@/lib/i18n";

const MoroccanLantern = dynamic(
  () => import("@/components/three/MoroccanLantern"),
  { ssr: false }
);

export default function Home() {
  const { t } = useLocale();

  const offers = [
    {
      title: t("offers.offer1Title"),
      description: t("offers.offer1Desc"),
      image: "/offer-1.jpg",
    },
    {
      title: t("offers.offer2Title"),
      description: t("offers.offer2Desc"),
      image: "/offer-2.jpg",
    },
    {
      title: t("offers.offer3Title"),
      description: t("offers.offer3Desc"),
      image: "/offer-3.jpg",
    },
  ];

  return (
    <main className="bg-cream overflow-x-hidden">
      <HeroSection />

      {/* ══════════ 2. ABOUT ══════════ */}
      <section className="py-16 sm:py-28 md:py-40 px-5 sm:px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-charcoal/40 text-xs tracking-[0.35em] uppercase mb-4 sm:mb-6">
              {t("about.label")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-center font-playfair text-2xl sm:text-3xl md:text-5xl lg:text-[3.4rem] text-charcoal leading-snug max-w-4xl mx-auto mb-12 sm:mb-20 [&_em]:text-terracotta [&_em]:italic [&_em]:not-italic"
              dangerouslySetInnerHTML={{ __html: t("about.heading") }}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center mb-12">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden relative">
                <img src="/about.jpg" alt="Hammam Nour interior" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <p className="text-charcoal/60 text-sm sm:text-base leading-[1.8] sm:leading-[1.9] mb-6 sm:mb-8">
                  {t("about.text")}
                </p>
                <Magnetic>
                  <Link href="/about" className="inline-flex items-center gap-2 text-charcoal text-sm tracking-[0.1em] group">
                    {t("about.readMore")}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Magnetic>
                <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
                  {[t("about.bullet1"), t("about.bullet2"), t("about.bullet3")].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-terracotta flex-shrink-0" />
                      <span className="text-charcoal/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════ 3. WHY CHOOSE — grid on mobile, circles on desktop ══════════ */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-6 bg-ivory">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-charcoal/40 text-xs tracking-[0.35em] uppercase mb-4">{t("advantages.label")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-center font-playfair text-2xl sm:text-3xl md:text-5xl text-charcoal mb-12 sm:mb-24">
              {t("advantages.heading")}
            </h2>
          </ScrollReveal>

          {/* Mobile: simple grid */}
          <ScrollReveal delay={0.2}>
            <div className="md:hidden grid grid-cols-2 gap-4">
              {[
                { title: t("advantages.tradition").replace("\n", " ") },
                { title: t("advantages.ingredients").replace("\n", " ") },
                { title: t("advantages.atmosphere").replace("\n", " ") },
                { title: t("advantages.service").replace("\n", " ") },
              ].map((item, i) => (
                <div key={i} className="bg-cream rounded-2xl p-6 text-center border border-sand/30">
                  <div className="w-12 h-12 rounded-full border border-terracotta/20 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-terracotta/50 text-lg font-playfair">{i + 1}</span>
                  </div>
                  <span className="font-playfair text-base text-charcoal/70">{item.title}</span>
                </div>
              ))}
              <div className="col-span-2 bg-terracotta/10 rounded-2xl p-6 text-center border border-terracotta/30">
                <span className="font-playfair text-lg text-charcoal mb-2 block">{t("advantages.therapists")}</span>
                <p className="text-charcoal/50 text-xs leading-relaxed">{t("advantages.therapistsDesc")}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Desktop: venn circles */}
          <ScrollReveal delay={0.2}>
            <div className="hidden md:block relative w-full max-w-3xl mx-auto aspect-[4/3]">
              <div className="absolute top-0 left-0 w-[55%] aspect-square rounded-full border border-terracotta/20 flex items-center justify-center">
                <span className="font-playfair text-xl text-charcoal/70 text-center whitespace-pre-line leading-tight">{t("advantages.tradition")}</span>
              </div>
              <div className="absolute top-0 right-0 w-[55%] aspect-square rounded-full border border-terracotta/20 flex items-center justify-center">
                <span className="font-playfair text-xl text-charcoal/70 text-center whitespace-pre-line leading-tight">{t("advantages.ingredients")}</span>
              </div>
              <div className="absolute bottom-0 left-[5%] w-[55%] aspect-square rounded-full border border-terracotta/20 flex items-center justify-center">
                <span className="font-playfair text-xl text-charcoal/70 text-center whitespace-pre-line leading-tight">{t("advantages.atmosphere")}</span>
              </div>
              <div className="absolute bottom-0 right-[5%] w-[55%] aspect-square rounded-full border border-terracotta/20 flex items-center justify-center">
                <span className="font-playfair text-xl text-charcoal/70 text-center whitespace-pre-line leading-tight">{t("advantages.service")}</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full bg-terracotta/10 border border-terracotta/30 flex flex-col items-center justify-center z-10 px-6">
                <span className="font-playfair text-2xl text-charcoal mb-3 text-center">{t("advantages.therapists")}</span>
                <svg width="48" height="48" viewBox="0 0 64 64" className="text-terracotta/50 mb-3">
                  <circle cx="32" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 54c0-11 8.954-20 20-20s20 9 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p className="text-charcoal/50 text-sm text-center leading-relaxed">{t("advantages.therapistsDesc")}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ 4. STATS ══════════ */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-cream">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          <CountUp end={3000} suffix="+" label={t("stats.guests")} />
          <CountUp end={12} label={t("stats.therapists")} />
          <CountUp end={15} label={t("stats.rituals")} />
          <CountUp end={17} label={t("stats.years")} />
        </div>
      </section>

      {/* ══════════ 5. GALLERY — 3D parallax scroll ══════════ */}
      <section
        className="py-16 sm:py-28 md:py-36 px-5 sm:px-6 overflow-hidden relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-spa.jpg')", backgroundAttachment: "fixed" }}
      >
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-playfair text-[14vw] sm:text-[12vw] md:text-[8vw] text-ivory/[0.15] leading-none text-center select-none mb-2 italic">
              {t("gallery.title")}
            </h2>
          </ScrollReveal>
          <GalleryCarousel />
        </div>
      </section>

      {/* ══════════ 6. OFFERS ══════════ */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-6 bg-sand/15">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-charcoal/40 text-xs tracking-[0.35em] uppercase mb-4">{t("offers.label")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-center font-playfair text-2xl sm:text-3xl md:text-5xl text-charcoal mb-6 leading-snug [&_u]:underline [&_u]:decoration-terracotta [&_u]:underline-offset-4 [&_u]:decoration-1"
              dangerouslySetInnerHTML={{ __html: t("offers.heading") }}
            />
          </ScrollReveal>

          <div className="space-y-6 sm:space-y-8 mt-10 sm:mt-16">
            {offers.map((offer, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <Magnetic strength={0.15}>
                  <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8 bg-cream/60 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border border-sand/40 hover:border-terracotta/20 transition-colors duration-500">
                    <div className="w-full md:w-[280px] h-[160px] sm:h-[200px] md:h-[180px] rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1 sm:py-2 px-1 sm:px-0">
                      <h3 className="font-playfair text-lg sm:text-xl md:text-2xl text-charcoal mb-2 sm:mb-3">{offer.title}</h3>
                      <p className="text-charcoal/60 text-sm leading-relaxed">{offer.description}</p>
                    </div>
                  </div>
                </Magnetic>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-10 sm:mt-14">
              <Magnetic>
                <Link href="/booking" className="inline-flex items-center gap-3 bg-charcoal text-ivory px-8 sm:px-10 py-3 sm:py-4 rounded-full text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-terracotta transition-colors duration-500">
                  {t("offers.cta")}
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ 7. TESTIMONIALS ══════════ */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-6 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-charcoal/40 text-xs tracking-[0.35em] uppercase mb-4">{t("testimonials.label")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl text-charcoal text-center mb-10 sm:mb-20">{t("testimonials.heading")}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              { name: "Sophie L.", text: t("testimonials.t1") },
              { name: "Youssef M.", text: t("testimonials.t2") },
              { name: "Elena K.", text: t("testimonials.t3") },
            ].map((testimonial, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <Magnetic strength={0.12}>
                  <div className="bg-cream p-6 sm:p-10 rounded-2xl hover:shadow-lg transition-shadow duration-500">
                    <div className="flex gap-1 mb-4 sm:mb-6">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#c4532a">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-charcoal/70 leading-relaxed mb-6 sm:mb-8 italic font-playfair text-base sm:text-lg">&ldquo;{testimonial.text}&rdquo;</p>
                    <p className="text-terracotta text-sm tracking-[0.2em] uppercase">{testimonial.name}</p>
                  </div>
                </Magnetic>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 8. CTA + 3D Lantern ══════════ */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-6 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-playfair text-[25vw] sm:text-[20vw] text-ivory/[0.03] leading-none">NOUR</span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <ScrollReveal>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-6xl text-ivory mb-6 sm:mb-8">{t("cta.heading")}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sand/50 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t("cta.text")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Magnetic>
                <Link href="/booking" className="inline-flex items-center gap-3 bg-terracotta text-ivory px-8 sm:px-12 py-3 sm:py-4 rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-clay transition-colors duration-500">
                  {t("cta.button")}
                </Link>
              </Magnetic>
            </ScrollReveal>
          </div>

          <div className="hidden lg:block w-[350px] flex-shrink-0">
            <MoroccanLantern />
          </div>
        </div>
      </section>
    </main>
  );
}
