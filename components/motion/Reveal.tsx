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
  /** Motion feel: soft (slow ease), normal (default), snappy (fast sharp) */
  stiffness?: "soft" | "normal" | "snappy";
  /** Add a slight scale-up effect */
  scale?: boolean;
};

const EASE_MAP: Record<string, [number, number, number, number]> = {
  soft: [0.25, 1, 0.5, 1],
  normal: [0.16, 1, 0.3, 1],
  snappy: [0.85, 0, 0.15, 1],
};

const DURATION_MAP: Record<string, number> = {
  soft: 1.1,
  normal: 0.9,
  snappy: 0.5,
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
  distance = 40,
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
        ...(scale ? { scale: 0.97 } : {}),
      };

  return (
    <Component
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once, margin: "-80px" }}
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
