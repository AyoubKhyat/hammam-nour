"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZelligePattern from "@/components/ui/ZelligePattern";

const amounts = [500, 750, 1000, 1500, 2000];

const packages = [
  { name: "Discovery", treatment: "hammam-express", price: 350, description: "A first taste of the hammam tradition" },
  { name: "Signature", treatment: "hammam-complet", price: 650, description: "The complete hammam ritual" },
  { name: "Royal", treatment: "hammam-royal", price: 950, description: "The ultimate indulgence" },
];

export default function GiftCardsPage() {
  const [tab, setTab] = useState<"amount" | "package">("amount");
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [purchased, setPurchased] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const finalAmount = tab === "amount"
    ? (customAmount ? parseInt(customAmount) : selectedAmount)
    : packages.find((p) => p.name === selectedPackage)?.price || 0;

  const handlePurchase = () => {
    if (!recipientName || !senderName || !email) return;
    setPurchased(true);
  };

  const handleDownloadPDF = () => {
    if (typeof window === "undefined") return;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 700;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1a1410";
    ctx.fillRect(0, 0, 1200, 700);

    ctx.strokeStyle = "#c4532a";
    ctx.lineWidth = 2;
    for (let x = 0; x < 1200; x += 40) {
      for (let y = 0; y < 20; y += 40) {
        ctx.beginPath();
        ctx.moveTo(x + 20, 0);
        ctx.lineTo(x + 40, 10);
        ctx.lineTo(x + 20, 20);
        ctx.lineTo(x, 10);
        ctx.closePath();
        ctx.stroke();
      }
      for (let y = 680; y < 700; y += 40) {
        ctx.beginPath();
        ctx.moveTo(x + 20, 680);
        ctx.lineTo(x + 40, 690);
        ctx.lineTo(x + 20, 700);
        ctx.lineTo(x, 690);
        ctx.closePath();
        ctx.stroke();
      }
    }

    ctx.fillStyle = "#faf7f2";
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.fillText("HAMMAM NOUR", 600, 200);

    ctx.fillStyle = "#c4532a";
    ctx.font = "24px serif";
    ctx.fillText("GIFT CARD", 600, 250);

    ctx.fillStyle = "#faf7f2";
    ctx.font = "72px serif";
    ctx.fillText(`${finalAmount} MAD`, 600, 360);

    ctx.fillStyle = "#e8d5b7";
    ctx.font = "20px sans-serif";
    ctx.fillText(`For: ${recipientName}`, 600, 430);
    if (message) {
      ctx.font = "italic 18px serif";
      ctx.fillText(`"${message}"`, 600, 470);
    }
    ctx.font = "16px sans-serif";
    ctx.fillText(`With love from ${senderName}`, 600, 520);

    ctx.fillStyle = "#c4532a";
    ctx.font = "12px sans-serif";
    ctx.fillText("42 Derb El Hammam, Medina, Marrakesh  |  +212 524 389 100", 600, 620);

    const link = document.createElement("a");
    link.download = `hammam-nour-gift-card-${recipientName.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (purchased) {
    return (
      <main className="bg-cream min-h-screen">
        <section className="pt-40 pb-20 px-6 bg-charcoal relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-5xl md:text-7xl text-ivory"
            >
              Gift Cards
            </motion.h1>
          </div>
        </section>

        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 rounded-full bg-terracotta mx-auto mb-8 flex items-center justify-center"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <h2 className="font-playfair text-3xl text-charcoal mb-4">Gift card created</h2>
            <p className="text-charcoal/60 mb-12">A beautiful gift of wellness has been prepared.</p>

            {/* Preview Card */}
            <div
              ref={cardRef}
              className="bg-charcoal p-10 mb-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-6 opacity-20">
                <ZelligePattern color="#c4532a" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-6 opacity-20">
                <ZelligePattern color="#c4532a" />
              </div>

              <p className="font-playfair text-2xl text-ivory tracking-[0.15em] mb-1">HAMMAM NOUR</p>
              <p className="text-terracotta text-sm tracking-[0.3em] uppercase mb-8">Gift Card</p>
              <p className="font-playfair text-5xl text-ivory mb-6">{finalAmount} MAD</p>
              <p className="text-sand/60 text-sm mb-1">For: {recipientName}</p>
              {message && <p className="text-sand/40 text-sm italic mb-4">&ldquo;{message}&rdquo;</p>}
              <p className="text-sand/40 text-xs">With love from {senderName}</p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="bg-terracotta text-ivory px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-clay transition-colors duration-500"
            >
              Download Gift Card
            </button>
          </motion.div>
        </section>
      </main>
    );
  }

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
            The gift of wellness
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-playfair text-5xl md:text-7xl text-ivory mb-6"
          >
            Gift Cards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sand/60 text-lg max-w-xl mx-auto"
          >
            Give someone the gift of ancient renewal. Choose an amount or a curated package.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Configuration */}
          <div>
            {/* Tabs */}
            <div className="flex gap-4 mb-10">
              <button
                onClick={() => setTab("amount")}
                className={`px-6 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                  tab === "amount" ? "bg-terracotta text-ivory" : "border border-sand/50 text-charcoal/60"
                }`}
              >
                Choose Amount
              </button>
              <button
                onClick={() => setTab("package")}
                className={`px-6 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                  tab === "package" ? "bg-terracotta text-ivory" : "border border-sand/50 text-charcoal/60"
                }`}
              >
                Treatment Package
              </button>
            </div>

            <AnimatePresence mode="wait">
              {tab === "amount" ? (
                <motion.div
                  key="amount"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        className={`p-4 text-center border transition-all duration-300 ${
                          selectedAmount === amt && !customAmount
                            ? "border-terracotta bg-terracotta/5"
                            : "border-sand/30 hover:border-terracotta/30 bg-ivory"
                        }`}
                      >
                        <span className="font-playfair text-xl text-charcoal">{amt}</span>
                        <span className="text-xs text-charcoal/40 ml-1">MAD</span>
                      </button>
                    ))}
                    <div className="relative">
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Custom"
                        className="w-full h-full p-4 text-center border border-sand/30 bg-ivory text-charcoal focus:border-terracotta focus:outline-none font-playfair text-xl"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="package"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-3"
                >
                  {packages.map((pkg) => (
                    <button
                      key={pkg.name}
                      onClick={() => setSelectedPackage(pkg.name)}
                      className={`w-full text-left p-6 border transition-all duration-300 ${
                        selectedPackage === pkg.name
                          ? "border-terracotta bg-terracotta/5"
                          : "border-sand/30 hover:border-terracotta/30 bg-ivory"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-playfair text-lg text-charcoal">{pkg.name}</h3>
                          <p className="text-charcoal/50 text-sm">{pkg.description}</p>
                        </div>
                        <p className="font-playfair text-xl text-terracotta">{pkg.price} MAD</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Personalization */}
            <div className="mt-10 space-y-5">
              <h3 className="font-playfair text-xl text-charcoal mb-4">Personalize</h3>
              <div>
                <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                  Recipient&apos;s Name *
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors"
                  placeholder="Who is this for?"
                />
              </div>
              <div>
                <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                  Personal Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors resize-none"
                  placeholder="A few words from the heart..."
                />
              </div>
              <div>
                <label className="block text-sm tracking-[0.15em] uppercase text-charcoal/60 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-ivory border border-sand/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <button
                onClick={handlePurchase}
                disabled={!recipientName || !senderName || !email || finalAmount <= 0}
                className={`w-full py-4 text-sm tracking-[0.2em] uppercase transition-all duration-500 mt-6 ${
                  recipientName && senderName && email && finalAmount > 0
                    ? "bg-terracotta text-ivory hover:bg-clay"
                    : "bg-sand/30 text-charcoal/30 cursor-not-allowed"
                }`}
              >
                Purchase Gift Card — {finalAmount > 0 ? `${finalAmount} MAD` : "..."}
              </button>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm tracking-[0.2em] uppercase text-charcoal/40 mb-4">Preview</p>
            <div className="bg-charcoal p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-8 opacity-20">
                <ZelligePattern color="#c4532a" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
                <ZelligePattern color="#c4532a" />
              </div>

              <div className="text-center py-8">
                <p className="font-playfair text-2xl text-ivory tracking-[0.15em] mb-1">HAMMAM NOUR</p>
                <p className="text-terracotta text-xs tracking-[0.3em] uppercase mb-10">Gift Card</p>

                <motion.p
                  key={finalAmount}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-playfair text-5xl text-ivory mb-8"
                >
                  {finalAmount > 0 ? `${finalAmount} MAD` : "— MAD"}
                </motion.p>

                <div className="space-y-2 min-h-[80px]">
                  {recipientName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sand/60 text-sm"
                    >
                      For: <span className="text-ivory">{recipientName}</span>
                    </motion.p>
                  )}
                  {message && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sand/40 text-sm italic"
                    >
                      &ldquo;{message}&rdquo;
                    </motion.p>
                  )}
                  {senderName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sand/40 text-xs mt-4"
                    >
                      With love from {senderName}
                    </motion.p>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-sand/10">
                  <p className="text-sand/30 text-[10px] tracking-wider">
                    42 Derb El Hammam, Medina, Marrakesh &middot; +212 524 389 100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
