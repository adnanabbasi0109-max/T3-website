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
  distance?: number;
  stiffness?: "soft" | "normal" | "snappy";
  scale?: boolean;
};

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

const DURATION_MAP: Record<string, number> = {
  soft: 1.2,
  normal: 0.85,
  snappy: 0.5,
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
  distance = 28,
  stiffness = "normal",
  scale = false,
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];
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
        filter: "blur(2px)",
        ...(scale ? { scale: 0.97 } : {}),
      };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    ...(scale ? { scale: 1 } : {}),
  };

  return (
    <Component
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration: reduced ? 0.15 : duration,
        delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
