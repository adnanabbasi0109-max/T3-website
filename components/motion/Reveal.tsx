"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade" | "left";
  once?: boolean;
  as?: "div" | "section" | "li";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  const hidden = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 32 : 0,
        x: direction === "left" ? -32 : 0,
      };

  return (
    <Component
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: reduced ? 0.2 : 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
