"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li";
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
  once = true,
  as = "div",
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, x: direction === "left" ? -60 : 60 }
      }
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.15 : 0.8,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
