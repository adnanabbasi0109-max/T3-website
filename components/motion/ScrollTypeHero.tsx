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
const ease: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

export default function ScrollTypeHero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const wordIndex = useTransform(scrollYProgress, [0, 0.85], [0, WORDS.length - 1]);

  const heroContent = (isAnimated: boolean) => (
    <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-10 lg:px-16">
      {isAnimated ? (
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease }}
          className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[1.02] tracking-[-0.035em]"
        >
          A Different
          <br />
          creative approach
          <br />
          to{" "}
          <span className="relative inline-block min-w-[3ch] text-accent">
            {WORDS.map((word, i) => (
              <WordItem key={word} word={word} index={i} wordIndex={wordIndex} />
            ))}
          </span>
        </motion.h1>
      ) : (
        <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[1.02] tracking-[-0.035em]">
          A Different
          <br />
          creative approach
          <br />
          to <span className="text-accent">{WORDS[0]}</span>
        </h1>
      )}

      {isAnimated ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease }}
          className="mt-10 max-w-[500px] text-[15px] leading-[1.8] text-muted sm:text-[16px]"
        >
          Proof-led creative strategy for brands that refuse to blend in.
          Over two decades of defying conventional wisdom.
        </motion.p>
      ) : (
        <p className="mt-10 max-w-[500px] text-[15px] leading-[1.8] text-muted sm:text-[16px]">
          Proof-led creative strategy for brands that refuse to blend in.
          Over two decades of defying conventional wisdom.
        </p>
      )}

      {isAnimated ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="mt-12 flex items-center gap-5"
        >
          <Link
            href="/work"
            className="btn-slide inline-flex h-12 items-center rounded-full bg-ink px-8 text-[13px] font-medium text-paper transition-all duration-600 hover:bg-ink-light"
          >
            <span className="btn-text">View Work &rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-full border border-border px-8 text-[13px] font-medium text-muted transition-all duration-600 hover:border-border-strong hover:text-ink"
          >
            Get in touch
          </Link>
        </motion.div>
      ) : (
        <div className="mt-12 flex items-center gap-5">
          <Link
            href="/work"
            className="btn-slide inline-flex h-12 items-center rounded-full bg-ink px-8 text-[13px] font-medium text-paper transition-all duration-600 hover:bg-ink-light"
          >
            <span className="btn-text">View Work &rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-full border border-border px-8 text-[13px] font-medium text-muted transition-all duration-600 hover:border-border-strong hover:text-ink"
          >
            Get in touch
          </Link>
        </div>
      )}
    </div>
  );

  if (reduced) {
    return (
      <section className="flex min-h-[90vh] items-end pb-24 sm:pb-32">
        {heroContent(false)}
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${WORDS.length * 250 + 800}px` }}
    >
      <div className="sticky top-0 flex h-screen items-end overflow-hidden pb-20 sm:pb-28 lg:pb-32">
        {heroContent(true)}
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
    if (Math.abs(diff) > 0.5) return diff > 0 ? -16 : 16;
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
