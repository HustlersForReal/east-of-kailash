"use client";

import { useState, useEffect } from "react";

export function PropertyBaapWatermark() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cols = isMobile ? 4 : 12;
  const count = isMobile ? 80 : 360;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ opacity: 0.12 }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const row = Math.floor(i / cols);
        return (
          <span
            key={i}
            className={`absolute font-black whitespace-nowrap ${
              isMobile ? "text-[13px]" : "text-[18px]"
            }`}
            style={{
              color: 'rgba(255,255,255,0.15)',
              top: `${row * (isMobile ? 5.5 : 5)}%`,
              left: `${(i % cols) * (isMobile ? 25 : 8.5)}%`,
            }}
          >
            PropertyBaap
          </span>
        );
      })}
    </div>
  );
}
