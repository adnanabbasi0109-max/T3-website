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
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.04]);

  const heroContent = (isAnimated: boolean) => (
    <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-10 lg:px-16">
      {/* Eyebrow */}
      {isAnimated ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0, ease }}
          className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:mb-10"
        >
          T3 Technologies — Est. 2004
        </motion.p>
      ) : (
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:mb-10">
          T3 Technologies — Est. 2004
        </p>
      )}

      {isAnimated ? (
        <motion.h1
          initial={{ opacity: 0, y: 48, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.15, ease }}
          className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.98] tracking-[-0.04em]"
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
        <h1 className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.98] tracking-[-0.04em]">
          A Different
          <br />
          creative approach
          <br />
          to <span className="text-accent">{WORDS[0]}</span>
        </h1>
      )}

      {isAnimated ? (
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.55, ease }}
          className="mt-10 max-w-[480px] text-[15px] leading-[1.8] text-muted sm:text-[16px]"
        >
          Proof-led creative strategy for brands that refuse to blend in.
          Over two decades of defying conventional wisdom.
        </motion.p>
      ) : (
        <p className="mt-10 max-w-[480px] text-[15px] leading-[1.8] text-muted sm:text-[16px]">
          Proof-led creative strategy for brands that refuse to blend in.
          Over two decades of defying conventional wisdom.
        </p>
      )}

      {isAnimated ? (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="mt-12 flex items-center gap-4"
        >
          <Link
            href="/work"
            className="btn-slide inline-flex h-[52px] items-center rounded-full bg-ink px-9 text-[13px] font-medium text-paper transition-all duration-600 hover:bg-ink-light hover:shadow-card"
          >
            <span className="btn-text">View Work &rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="glow-ring inline-flex h-[52px] items-center rounded-full border border-border px-9 text-[13px] font-medium text-muted transition-all duration-600 hover:border-border-strong hover:text-ink"
          >
            Get in touch
          </Link>
        </motion.div>
      ) : (
        <div className="mt-12 flex items-center gap-4">
          <Link
            href="/work"
            className="btn-slide inline-flex h-[52px] items-center rounded-full bg-ink px-9 text-[13px] font-medium text-paper transition-all duration-600 hover:bg-ink-light"
          >
            <span className="btn-text">View Work &rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-[52px] items-center rounded-full border border-border px-9 text-[13px] font-medium text-muted transition-all duration-600 hover:border-border-strong hover:text-ink"
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
        {/* Subtle background gradient that evolves on scroll */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: bgOpacity,
            background: "radial-gradient(ellipse 80% 60% at 70% 100%, var(--color-accent), transparent)",
          }}
        />
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
    if (Math.abs(diff) > 0.5) return diff > 0 ? -20 : 20;
    return 0;
  });

  const blur = useTransform(wordIndex, (v: number) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? "blur(0px)" : "blur(4px)";
  });

  return (
    <motion.span
      style={{ opacity, y, filter: blur }}
      className="absolute left-0 top-0"
    >
      {word}
    </motion.span>
  );
}
