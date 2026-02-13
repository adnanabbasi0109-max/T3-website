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
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
  distance = 40,
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];

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
      };

  return (
    <Component
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.15 : 0.9,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
