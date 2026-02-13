"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "up" | "fade" | "left" */
  direction?: "up" | "fade" | "left";
  once?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: Props) {
  const reduced = useReducedMotion();

  const variants = {
    hidden: reduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: direction === "up" ? 24 : 0,
          x: direction === "left" ? -24 : 0,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={variants}
      transition={{
        duration: reduced ? 0.3 : 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
