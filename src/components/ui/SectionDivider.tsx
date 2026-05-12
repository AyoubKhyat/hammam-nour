"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center py-4">
      <svg width="200" height="20" viewBox="0 0 200 20" className="overflow-visible">
        <path
          d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10"
          fill="none"
          stroke="#c4532a"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: isVisible ? 0 : 300,
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
      </svg>
    </div>
  );
}
