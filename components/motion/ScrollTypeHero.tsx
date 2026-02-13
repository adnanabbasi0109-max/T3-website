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

  // Map 0–85% of scroll to word cycling, leave 15% for exit
  const wordIndex = useTransform(scrollYProgress, [0, 0.85], [0, WORDS.length - 1]);

  if (reduced) {
    return (
      <section className="flex min-h-[85vh] items-center">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">
            T3 Technologies
          </p>
          <h1 className="mt-10 text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            We build what
            <br />
            matters in{" "}
            <span className="text-gold">{WORDS[0]}</span>
          </h1>
          <p className="mt-10 max-w-[440px] text-[15px] leading-[1.75] text-muted">
            Defying conventional wisdom. Deconstructing complex systems to
            create simple, powerful solutions — for over two decades.
          </p>
          <div className="mt-14 flex items-center gap-6">
            <Link
              href="/work"
              className="inline-flex h-[50px] items-center rounded-full bg-surface-dark px-9 text-[13px] font-medium text-white transition-all duration-300 hover:bg-surface-dark/85"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-muted transition-colors duration-300 hover:text-surface-dark"
            >
              Get in touch&nbsp;&rarr;
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
      style={{ height: `${WORDS.length * 260 + 700}px` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted"
          >
            T3 Technologies
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="mt-10 text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
          >
            We build what
            <br />
            matters in{" "}
            <span className="relative inline-block min-w-[2ch] text-gold">
              {WORDS.map((word, i) => (
                <WordItem
                  key={word}
                  word={word}
                  index={i}
                  wordIndex={wordIndex}
                />
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            className="mt-10 max-w-[440px] text-[15px] leading-[1.75] text-muted"
          >
            Defying conventional wisdom. Deconstructing complex systems to
            create simple, powerful solutions — for over two decades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.95, ease }}
            className="mt-14 flex items-center gap-6"
          >
            <Link
              href="/work"
              className="inline-flex h-[50px] items-center rounded-full bg-surface-dark px-9 text-[13px] font-medium text-white transition-all duration-300 hover:bg-surface-dark/85"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-muted transition-colors duration-300 hover:text-surface-dark"
            >
              Get in touch&nbsp;&rarr;
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
    if (Math.abs(diff) > 1) return diff > 0 ? -28 : 28;
    return diff * -28;
  });

  return (
    <motion.span style={{ opacity, y }} className="absolute left-0 top-0">
      {word}
    </motion.span>
  );
}
