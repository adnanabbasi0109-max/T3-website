"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "word" | "char";
  stagger?: number;
  once?: boolean;
  delay?: number;
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  mode = "word",
  stagger = 0.04,
  once = true,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const units =
    mode === "word"
      ? text.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + " " : w))
      : text.split("");

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once, margin: "-15%" }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease,
            }}
            aria-hidden="true"
          >
            {unit === " " ? "\u00A0" : unit}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
