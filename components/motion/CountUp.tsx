"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  className?: string;
  duration?: number;
};

export default function CountUp({
  value,
  className = "",
  duration = 1.5,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();

  // Parse numeric part and suffix
  const match = value.match(/^([\d,.]+)(.*)$/);
  const numericTarget = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  const suffix = match ? match[2] : value;

  const [displayNum, setDisplayNum] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    if (reduced) {
      setDisplayNum(numericTarget);
      setHasAnimated(true);
      return;
    }

    setHasAnimated(true);
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out-expo approximation
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayNum(Math.round(eased * numericTarget));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, hasAnimated, numericTarget, duration, reduced]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayNum}
      {suffix}
    </span>
  );
}
