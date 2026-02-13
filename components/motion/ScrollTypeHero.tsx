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
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ScrollTypeHero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const wordIndex = useTransform(scrollYProgress, [0, 0.85], [0, WORDS.length - 1]);

  /* ── Reduced-motion fallback ── */
  if (reduced) {
    return (
      <section className="flex min-h-[85vh] items-end pb-20 sm:pb-28">
        <div className="mx-auto w-full max-w-[1080px] px-6 sm:px-8 lg:px-12">
          <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.03em]">
            We build what
            <br />
            matters in{" "}
            <span className="text-gold">{WORDS[0]}</span>
          </h1>
          <p className="mt-8 max-w-[480px] text-[15px] leading-[1.75] text-muted sm:text-base">
            Proof-led creative strategy for brands that refuse to blend in.
            Over two decades of defying conventional wisdom.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/work"
              className="inline-flex h-11 items-center bg-ink px-6 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-light"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
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
      style={{ height: `${WORDS.length * 250 + 700}px` }}
    >
      <div className="sticky top-0 flex h-screen items-end overflow-hidden pb-16 sm:pb-24 lg:pb-28">
        <div className="mx-auto w-full max-w-[1080px] px-6 sm:px-8 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.03em]"
          >
            We build what
            <br />
            matters in{" "}
            <span className="relative inline-block min-w-[3ch] text-gold">
              {WORDS.map((word, i) => (
                <WordItem key={word} word={word} index={i} wordIndex={wordIndex} />
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-8 max-w-[480px] text-[15px] leading-[1.75] text-muted sm:text-base"
          >
            Proof-led creative strategy for brands that refuse to blend in.
            Over two decades of defying conventional wisdom.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-10 flex items-center gap-6"
          >
            <Link
              href="/work"
              className="inline-flex h-11 items-center bg-ink px-6 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-light"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
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
    if (Math.abs(diff) > 0.5) return diff > 0 ? -12 : 12;
    return 0;
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
