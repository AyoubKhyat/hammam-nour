"use client";

import { useEffect, useRef } from "react";

interface ZelligePatternProps {
  className?: string;
  color?: string;
  animated?: boolean;
}

export default function ZelligePattern({
  className = "",
  color = "#c4532a",
  animated = false,
}: ZelligePatternProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animated || !svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path, circle, polygon");
    paths.forEach((path, i) => {
      const el = path as SVGElement;
      el.style.opacity = "0";
      el.style.transition = `opacity 0.4s ease ${i * 0.05}s`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, [animated]);

  return (
    <svg
      ref={svgRef}
      className={`${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="zellige-main"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="30,0 60,15 60,45 30,60 0,45 0,15"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          />
          <circle
            cx="30"
            cy="30"
            r="8"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          />
          <path
            d="M30 22 L38 30 L30 38 L22 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.2"
          />
          <circle
            cx="0"
            cy="0"
            r="3"
            fill={color}
            opacity="0.05"
          />
          <circle
            cx="60"
            cy="0"
            r="3"
            fill={color}
            opacity="0.05"
          />
          <circle
            cx="0"
            cy="60"
            r="3"
            fill={color}
            opacity="0.05"
          />
          <circle
            cx="60"
            cy="60"
            r="3"
            fill={color}
            opacity="0.05"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#zellige-main)" />
    </svg>
  );
}
