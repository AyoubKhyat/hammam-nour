"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ZelligePattern from "@/components/ui/ZelligePattern";
import SectionDivider from "@/components/ui/SectionDivider";
import { treatments, categoryLabels, type Category } from "@/data/treatments";

const categories: (Category | "all")[] = ["all", "hammam", "massage", "facial", "body-wrap"];

export default function TreatmentsPage() {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? treatments : treatments.filter((t) => t.category === active);

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 bg-charcoal overflow-hidden">
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
            Our Menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-playfair text-5xl md:text-7xl text-ivory mb-6"
          >
            Treatments & Rituals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sand/60 text-lg max-w-xl mx-auto"
          >
            Each ritual is a journey — crafted from centuries of Moroccan wellness tradition
            and performed by master hands.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 px-6 border-b border-sand/30">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                active === cat
                  ? "bg-terracotta text-ivory"
                  : "text-charcoal/60 hover:text-terracotta border border-sand/50 hover:border-terracotta/30"
              }`}
            >
              {cat === "all" ? "All" : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((treatment, i) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link href={`/booking?treatment=${treatment.id}`}>
                    <div className="group relative bg-ivory p-8 border border-sand/30 hover:border-terracotta/30 transition-all duration-700 h-full overflow-hidden">
                      <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/5 transition-colors duration-700" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                        <ZelligePattern />
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs tracking-[0.2em] uppercase text-terracotta/60">
                            {categoryLabels[treatment.category]}
                          </span>
                          <span className="text-charcoal/40 text-sm">{treatment.duration}</span>
                        </div>

                        <h3 className="font-playfair text-xl text-charcoal group-hover:text-clay transition-colors duration-500 mt-3">
                          {treatment.nameFr}
                        </h3>
                        <p className="text-sand/80 text-sm mt-1" dir="rtl">
                          {treatment.nameAr}
                        </p>

                        <p className="text-charcoal/60 text-sm leading-relaxed mt-4 mb-6">
                          {treatment.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {treatment.ingredients.map((ing) => (
                            <span
                              key={ing}
                              className="text-[10px] tracking-wider uppercase text-terracotta/50 border border-terracotta/15 px-2 py-0.5"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-sand/20">
                          <p className="font-playfair text-2xl text-terracotta">
                            {treatment.price} <span className="text-sm">MAD</span>
                          </p>
                          <span className="text-xs tracking-[0.2em] uppercase text-terracotta/60 group-hover:text-terracotta transition-colors duration-300">
                            Book now &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-20 px-6 bg-terracotta relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ZelligePattern color="#faf7f2" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl md:text-5xl text-ivory mb-6">
              Not sure which ritual is right for you?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-cream/60 mb-10">
              Our therapists will guide you to the perfect experience. Contact us or visit for a consultation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href="/booking"
              className="inline-block bg-ivory text-terracotta px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-cream transition-colors duration-500"
            >
              Book a consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
