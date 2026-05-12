"use client";

import { useState, useRef, useEffect } from "react";

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gains: GainNode[]; oscillators: OscillatorNode[] }>({
    gains: [],
    oscillators: [],
  });

  const createAmbientSound = () => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.03;
    masterGain.connect(ctx.destination);

    const createWaterDrip = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.value = 800;
      filter.Q.value = 5;

      osc.type = "sine";
      osc.frequency.value = 600 + Math.random() * 400;
      gain.gain.value = 0;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start();

      const drip = () => {
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
        setTimeout(drip, 2000 + Math.random() * 5000);
      };

      setTimeout(drip, Math.random() * 3000);
      return { osc, gain };
    };

    const createAmbientWash = () => {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 200;

      const gain = ctx.createGain();
      gain.gain.value = 0.5;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      source.start();

      return { gain };
    };

    const drip1 = createWaterDrip();
    const drip2 = createWaterDrip();
    const wash = createAmbientWash();

    nodesRef.current = {
      gains: [drip1.gain, drip2.gain, wash.gain],
      oscillators: [drip1.osc, drip2.osc],
    };
  };

  const toggle = () => {
    if (isPlaying) {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    } else {
      createAmbientSound();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-charcoal/80 backdrop-blur-sm border border-sand/20 flex items-center justify-center group hover:border-terracotta/50 transition-colors duration-300"
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      <div className="relative">
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-terracotta">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-sand/50 group-hover:text-ivory transition-colors">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </button>
  );
}
