"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

const WORDS = ["Brand", "Innovation", "PR", "AI", "Design", "Strategy"];

export default function ScrollTypeHero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Each word occupies 1/WORDS.length of the scroll progress
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, WORDS.length]);

  if (reduced) {
    return (
      <div ref={containerRef} className="relative min-h-[140vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
              T3 Technologies
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
              We build what
              <br />
              matters in{" "}
              <span className="text-gold">{WORDS[0]}</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${WORDS.length * 250 + 600}px` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400"
          >
            T3 Technologies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
          >
            We build what
            <br />
            matters in{" "}
            <WordSwitcher wordIndex={wordIndex} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-md text-base leading-relaxed text-neutral-500"
          >
            Strategy. Craft. Outcome. Documented from brief to result.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function WordSwitcher({
  wordIndex,
}: {
  wordIndex: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <span className="relative inline-block min-w-[3ch] text-gold">
      <AnimatePresence mode="popLayout">
        {WORDS.map((word, i) => (
          <WordItem key={word} word={word} index={i} wordIndex={wordIndex} />
        ))}
      </AnimatePresence>
    </span>
  );
}

function WordItem({
  word,
  index,
  wordIndex,
}: {
  word: string;
  index: number;
  wordIndex: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(wordIndex, (v: number) => {
    const dist = Math.abs(v - index);
    if (dist < 0.5) return 1;
    if (dist < 1) return 0;
    return 0;
  });

  const y = useTransform(wordIndex, (v: number) => {
    const diff = v - index;
    if (Math.abs(diff) > 1) return diff > 0 ? -20 : 20;
    return diff * -20;
  });

  return (
    <motion.span
      style={{ opacity, y }}
      className="absolute left-0 top-0"
    >
      {word}
    </motion.span>
  );
}
