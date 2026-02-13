"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade" | "left" | "right";
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "aside";
  /** Distance in px for the initial offset */
  distance?: number;
  /** Motion feel */
  stiffness?: "soft" | "normal" | "snappy";
  /** Slight scale-up */
  scale?: boolean;
};

const EASE_MAP: Record<string, [number, number, number, number]> = {
  soft: [0.25, 1, 0.5, 1],
  normal: [0.16, 1, 0.3, 1],
  snappy: [0.85, 0, 0.15, 1],
};

const DURATION_MAP: Record<string, number> = {
  soft: 0.9,
  normal: 0.75,
  snappy: 0.45,
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
  distance = 24,
  stiffness = "normal",
  scale = false,
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  const ease = EASE_MAP[stiffness];
  const duration = DURATION_MAP[stiffness];

  const initial = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? distance : 0,
        x:
          direction === "left"
            ? -distance
            : direction === "right"
              ? distance
              : 0,
        ...(scale ? { scale: 0.98 } : {}),
      };

  return (
    <Component
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: reduced ? 0.15 : duration,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
