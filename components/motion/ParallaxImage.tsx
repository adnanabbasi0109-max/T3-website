"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  aspect?: string;
  grayscale?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
  aspect = "aspect-[3/2]",
  grayscale = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}%`, `${speed * 100}%`]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${aspect} ${className}`}
    >
      {reduced ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${grayscale ? "grayscale transition-[filter] duration-600 hover:grayscale-0" : ""}`}
          loading="lazy"
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          style={{ y, scale: 1.2 }}
          className={`h-full w-full object-cover ${grayscale ? "grayscale transition-[filter] duration-600 hover:grayscale-0" : ""}`}
          loading="lazy"
        />
      )}
    </div>
  );
}
