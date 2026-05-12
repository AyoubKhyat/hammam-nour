"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ZelligePattern from "@/components/ui/ZelligePattern";
import { treatments, categoryLabels } from "@/data/treatments";

const steps = ["Treatment", "Date & Time", "Details", "Confirmation"];

const timeSlots = {
  morning: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
  afternoon: ["12:00", "12:30", "13:00", "14:00", "14:30", "15:00", "15:30", "16:00"],
  evening: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],
};

function generateDays() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const booked = Math.random() > 0.7;
    days.push({
      date,
      available: !booked,
      day: date.getDate(),
      weekday: date.toLocaleDateString("en", { weekday: "short" }),
      month: date.toLocaleDateString("en", { month: "short" }),
    });
  }
  return days;
}

function BookingContent() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("treatment");

  const [step, setStep] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState(preselected || "");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [days] = useState(generateDays);

  useEffect(() => {
    if (preselected && treatments.find((t) => t.id === preselected)) {
      setStep(1);
    }
  }, [preselected]);

  const treatment = treatments.find((t) => t.id === selectedTreatment);

  const canProceed = () => {
    switch (step) {
      case 0: return !!selectedTreatment;
      case 1: return !!selectedDate && !!selectedTime;
      case 2: return !!formData.name && !!formData.email;
      default: return false;
    }
  };

  return (
    <main className="bg-cream min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-12 px-6 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-7xl text-ivory mb-4"
          >
            Book Your Ritual
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sand/60"
          >
            Reserve your sanctuary moment
          </motion.p>
        </div>
      </section>

      {/* Progress */}
      <div className="px-6 py-8 border-b border-sand/30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                    i <= step
                      ? "bg-terracotta text-ivory"
                      : "bg-sand/30 text-charcoal/40"
                  }`}
                >
                  {i < step ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="text-xs mt-2 tracking-wider uppercase text-charcoal/50 hidden sm:block">
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 sm:w-24 h-[1px] mx-2 transition-colors duration-500 ${
                  i < step ? "bg-terracotta" : "bg-sand/30"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {/* Step 1: Treatment */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-playfair text-3xl text-charcoal mb-8">Choose your treatment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treatments.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTreatment(t.id)}
                    className={`text-left p-6 border transition-all duration-300 ${
                      selectedTreatment === t.id
                        ? "border-terracotta bg-terracotta/5"
                        : "border-sand/30 hover:border-terracotta/30 bg-ivory"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-terracotta/60">
                          {categoryLabels[t.category]}
                        </span>
                        <h3 className="font-playfair text-lg text-charcoal mt-1">{t.nameFr}</h3>
                        <p className="text-charcoal/50 text-sm mt-1">{t.duration}</p>
                      </div>
                      <p className="font-playfair text-xl text-terracotta">{t.price} <span className="text-xs">MAD</span></p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-playfair text-3xl text-charcoal mb-8">Pick a date & time</h2>

              {/* Calendar */}
              <div className="mb-12">
                <div className="grid grid-cols-7 gap-2">
                  {days.slice(0, 28).map((d, i) => (
                    <button
                      key={i}
                      disabled={!d.available}
                      onClick={() => { setSelectedDate(d.date); setSelectedTime(""); }}
                      className={`p-3 text-center border transition-all duration-300 relative ${
                        !d.available
                          ? "bg-sand/10 text-charcoal/20 border-transparent cursor-not-allowed"
                          : selectedDate?.toDateString() === d.date.toDateString()
                          ? "border-terracotta bg-terracotta/10 text-charcoal"
                          : "border-sand/20 hover:border-terracotta/30 text-charcoal bg-ivory"
                      }`}
                    >
                      <div className="text-[10px] uppercase text-charcoal/40">{d.weekday}</div>
                      <div className="font-playfair text-lg">{d.day}</div>
                      <div className="text-[10px] text-charcoal/40">{d.month}</div>
                      {d.available && (
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-terracotta/60" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {(Object.entries(timeSlots) as [string, string[]][]).map(([period, slots]) => (
                    <div key={period} className="mb-8">
                      <h3 className="text-sm tracking-[0.2em] uppercase text-charcoal/50 mb-3 capitalize">
                        {period}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((time) => {
                          const unavailable = Math.random() > 0.8;
                          return (
                            <button
                              key={time}
                              disabled={unavailable}
                              onClick={() => setSelectedTime(time)}
                              className={`px-4 py-2 text-sm border transition-all duration-300 ${
                                unavailable
                                  ? "text-charcoal/20 border-transparent cursor-not-allowed"
                                  : selectedTime === time
                                  ? "border-terracotta bg-terracotta text-ivory"
                                  : "border-sand/30 hover:border-terracotta/30 text-charcoal"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Guest Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-playfair text-3xl text-charcoal mb-8">Your details</h2>

              {/* Summary */}
              <div className="bg-ivory border border-sand/30 p-6 mb-10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-playfair text-lg text-charcoal">{treatment?.nameFr}</p>
                    <p className="text-charcoal/50 text-sm">{treatment?.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-playfair text-xl text-terracotta">{treatment?.price} MAD</p>
                    <p className="text-charcoal/50 text-sm">
                      {selectedDate?.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}
                      {" at "}{selectedTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors"
                    placeholder="+212..."
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors resize-none"
                    placeholder="Allergies, preferences, celebrations..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-terracotta mx-auto mb-8 flex items-center justify-center"
              >
                <motion.svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.polyline
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </motion.svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="font-playfair text-4xl text-charcoal mb-4"
              >
                Your ritual is booked
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-charcoal/60 mb-12 max-w-md mx-auto"
              >
                A confirmation has been sent to {formData.email}. We look forward to welcoming you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-ivory border border-sand/30 p-8 max-w-md mx-auto text-left"
              >
                <h3 className="font-playfair text-xl text-charcoal mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Treatment</span>
                    <span className="text-charcoal font-medium">{treatment?.nameFr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Duration</span>
                    <span className="text-charcoal">{treatment?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Date</span>
                    <span className="text-charcoal">
                      {selectedDate?.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Time</span>
                    <span className="text-charcoal">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Guest</span>
                    <span className="text-charcoal">{formData.name}</span>
                  </div>
                  <div className="border-t border-sand/30 pt-3 mt-3 flex justify-between">
                    <span className="text-charcoal font-medium">Total</span>
                    <span className="font-playfair text-xl text-terracotta">{treatment?.price} MAD</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-12 pt-8 border-t border-sand/30">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`px-6 py-3 text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                step === 0
                  ? "text-charcoal/20 cursor-not-allowed"
                  : "text-charcoal/60 hover:text-terracotta"
              }`}
              disabled={step === 0}
            >
              &larr; Back
            </button>
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              className={`px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                canProceed()
                  ? "bg-terracotta text-ivory hover:bg-clay"
                  : "bg-sand/30 text-charcoal/30 cursor-not-allowed"
              }`}
              disabled={!canProceed()}
            >
              {step === 2 ? "Confirm booking" : "Continue"} &rarr;
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="bg-cream min-h-screen flex items-center justify-center">
        <div className="font-playfair text-2xl text-charcoal/40">Loading...</div>
      </main>
    }>
      <BookingContent />
    </Suspense>
  );
}
