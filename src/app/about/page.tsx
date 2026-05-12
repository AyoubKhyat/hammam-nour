"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import ZelligePattern from "@/components/ui/ZelligePattern";
import CountUp from "@/components/ui/CountUp";

const team = [
  { name: "Fatima Zahra", role: "Master Therapist", years: 18 },
  { name: "Hassan Benali", role: "Hammam Master", years: 22 },
  { name: "Amina Ouali", role: "Senior Therapist", years: 12 },
  { name: "Karim Idrissi", role: "Massage Specialist", years: 15 },
  { name: "Nadia Chafik", role: "Facial Expert", years: 10 },
  { name: "Youssef Amrani", role: "Body Wrap Specialist", years: 8 },
];

const ingredients = [
  {
    name: "Argan Oil",
    nameAr: "زيت الأركان",
    description: "Liquid gold from the Atlas Mountains. Cold-pressed for maximum potency.",
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <ellipse cx="30" cy="35" rx="12" ry="15" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <path d="M30 20 Q28 28 30 35 Q32 28 30 20" fill="none" stroke="#c4532a" strokeWidth="1" />
        <circle cx="30" cy="15" r="3" fill="none" stroke="#c4532a" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "Rose Water",
    nameAr: "ماء الورد",
    description: "Damask roses from the Dadès Valley, distilled to capture their eternal essence.",
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="6" fill="none" stroke="#c4532a" strokeWidth="1" />
        <path d="M30 18 Q24 24 30 30 Q36 24 30 18" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <path d="M18 30 Q24 24 30 30 Q24 36 18 30" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <path d="M30 42 Q36 36 30 30 Q24 36 30 42" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <path d="M42 30 Q36 36 30 30 Q36 24 42 30" fill="none" stroke="#c4532a" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Ghassoul Clay",
    nameAr: "الغسول",
    description: "Mineral-rich clay from the Atlas Mountains, used for purification since antiquity.",
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <path d="M15 40 Q20 25 30 20 Q40 25 45 40" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <line x1="15" y1="40" x2="45" y2="40" stroke="#c4532a" strokeWidth="1.5" />
        <path d="M25 40 L25 32" stroke="#c4532a" strokeWidth="1" />
        <path d="M30 40 L30 28" stroke="#c4532a" strokeWidth="1" />
        <path d="M35 40 L35 32" stroke="#c4532a" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "Black Soap",
    nameAr: "الصابون البلدي",
    description: "Olive-based soap aged for months. The foundation of every authentic hammam ritual.",
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <rect x="18" y="22" width="24" height="16" rx="4" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <ellipse cx="30" cy="22" rx="12" ry="4" fill="none" stroke="#c4532a" strokeWidth="1.5" />
        <path d="M22 30 Q26 28 30 30 Q34 32 38 30" stroke="#c4532a" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
];

const storyChapters = [
  {
    year: "2008",
    title: "The First Steam",
    text: "In a centuries-old riad tucked deep in the medina, Hammam Nour was born from a single vision: to preserve the sacred art of Moroccan bathing while creating a sanctuary for the modern soul.",
  },
  {
    year: "2012",
    title: "Masters of the Craft",
    text: "We gathered a team of master therapists, each carrying decades of inherited knowledge. Their hands learned from their mothers, who learned from theirs — an unbroken chain of healing wisdom.",
  },
  {
    year: "2016",
    title: "The Renovation",
    text: "The hammam was reborn — hand-laid zellige tiles from Fez artisans, copper fixtures hammered in the souk, marble basins sourced from the same quarries that supplied the palaces of old.",
  },
  {
    year: "2020",
    title: "A New Chapter",
    text: "Through quiet years, we deepened our practice. New rituals were born from ancient recipes. Our commitment to authenticity grew stronger with every guest who stepped through our arch.",
  },
  {
    year: "Today",
    title: "The Living Tradition",
    text: "Over 3,000 guests have passed through our doors. Each one leaves a little lighter, a little softer, a little more connected to something ancient and true.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-terracotta text-sm tracking-[0.3em] uppercase mb-6"
          >
            Est. 2008
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-playfair text-5xl md:text-7xl text-ivory mb-8"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sand/60 text-lg max-w-xl mx-auto leading-relaxed"
          >
            A journey from ancient tradition to living sanctuary —
            carried by the hands and hearts of those who believe
            in the healing power of warmth, water, and time.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          {storyChapters.map((chapter, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex gap-8 mb-20 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair text-sm text-terracotta">{chapter.year}</span>
                  </div>
                  {i < storyChapters.length - 1 && (
                    <div className="w-[1px] h-full bg-terracotta/20 mt-4" />
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="font-playfair text-2xl text-charcoal mb-3">{chapter.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed">{chapter.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Zellige Assembly Section */}
      <section className="py-32 px-6 bg-terracotta relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ZelligePattern color="#faf7f2" animated />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-playfair text-4xl md:text-6xl text-ivory mb-8">
              Crafted tile by tile
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Like the zellige tiles that adorn our walls, Hammam Nour was built with patience
              and intention. Each piece placed by hand, each ritual shaped by centuries of wisdom.
              The result is not perfection — it is authenticity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6 bg-ivory">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <CountUp end={3000} suffix="+" label="Guests welcomed" />
          <CountUp end={12} label="Master therapists" />
          <CountUp end={15} label="Unique treatments" />
          <CountUp end={17} label="Years of tradition" />
        </div>
      </section>

      <SectionDivider />

      {/* Team */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-terracotta text-sm tracking-[0.3em] uppercase mb-4 text-center">
              The hands behind the healing
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal text-center mb-20">
              Our Therapists
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="arch-clip aspect-[3/4] bg-gradient-to-br from-sand to-terracotta/30 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/60 to-transparent">
                      <p className="text-ivory/60 text-xs tracking-wider">{member.years} years experience</p>
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl text-charcoal">{member.name}</h3>
                  <p className="text-terracotta/60 text-sm tracking-wider uppercase mt-1">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Ingredients */}
      <section className="py-32 px-6 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-terracotta text-sm tracking-[0.3em] uppercase mb-4 text-center">
              From the earth
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal text-center mb-20">
              Our Ingredients
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-6 p-8 bg-cream border border-sand/30">
                  <div className="flex-shrink-0 opacity-70">{ing.icon}</div>
                  <div>
                    <h3 className="font-playfair text-xl text-charcoal">{ing.name}</h3>
                    <p className="text-terracotta/60 text-sm mb-2" dir="rtl">{ing.nameAr}</p>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{ing.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-charcoal/40 text-sm tracking-[0.2em] uppercase mb-6">
              Certified & Recognized
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-8 text-charcoal/30">
              {["Moroccan Spa Association", "Traditional Hammam Guild", "Organic Ingredients Certified", "Wellness Tourism Award 2023"].map((cert, i) => (
                <span key={i} className="text-sm tracking-wider border border-sand/30 px-6 py-3">
                  {cert}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
