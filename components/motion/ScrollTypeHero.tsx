"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const WORDS = ["Brand", "Innovation", "PR", "AI", "Design", "Strategy"];

export default function ScrollTypeHero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const wordIndex = useTransform(scrollYProgress, [0, 0.85], [0, WORDS.length - 1]);

  if (reduced) {
    return (
      <section className="flex min-h-[80vh] items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400">
            T3 Technologies
          </p>
          <h1 className="mt-8 text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            We build what
            <br />
            matters in <span className="text-gold">{WORDS[0]}</span>
          </h1>
          <p className="mt-10 max-w-[420px] text-[15px] leading-[1.7] text-neutral-500">
            Strategy. Craft. Outcome. Twenty years of turning bold ideas into
            documented results.
          </p>
          <div className="mt-14 flex items-center gap-6">
            <Link
              href="/work"
              className="inline-flex h-12 items-center rounded-full bg-surface-dark px-8 text-[13px] font-medium text-white transition-all hover:opacity-90"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-neutral-500 transition hover:text-surface-dark"
            >
              Get in touch &rarr;
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${WORDS.length * 280 + 600}px` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400"
          >
            T3 Technologies
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
          >
            We build what
            <br />
            matters in{" "}
            <span className="relative inline-block min-w-[2.5ch] text-gold">
              {WORDS.map((word, i) => (
                <WordItem key={word} word={word} index={i} wordIndex={wordIndex} />
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-[420px] text-[15px] leading-[1.7] text-neutral-500"
          >
            Strategy. Craft. Outcome. Twenty years of turning bold ideas into
            documented results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex items-center gap-6"
          >
            <Link
              href="/work"
              className="inline-flex h-12 items-center rounded-full bg-surface-dark px-8 text-[13px] font-medium text-white transition-all hover:opacity-90"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-neutral-500 transition hover:text-surface-dark"
            >
              Get in touch &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
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
    return dist < 0.5 ? 1 : 0;
  });

  const y = useTransform(wordIndex, (v: number) => {
    const diff = v - index;
    if (Math.abs(diff) > 1) return diff > 0 ? -24 : 24;
    return diff * -24;
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
