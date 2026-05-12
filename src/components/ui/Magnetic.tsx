"use client";

import { useRef, useState, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const isResting = pos.x === 0 && pos.y === 0;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: isResting
          ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "transform 0.12s ease-out",
      }}
    >
      {children}
    </div>
  );
}
