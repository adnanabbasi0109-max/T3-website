"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
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

  if (reduced) {
    return (
      <section className="flex min-h-[90vh] items-center bg-gradient-to-r from-paper to-paper-warm">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-10 lg:px-16">
          <p className="text-[12px] font-medium uppercase tracking-[0.35em] text-muted">
            T3 Technologies
          </p>
          <h1 className="mt-10 font-display text-[clamp(3rem,10vw,9rem)] leading-[1] tracking-[-0.02em]">
            We build what
            <br />
            matters in
            <br />
            <span className="text-gold">{WORDS[0]}</span>
          </h1>
          <p className="mt-12 max-w-[440px] text-[15px] font-light leading-[1.85] tracking-[0.02em] text-muted/70">
            Defying conventional wisdom. Deconstructing complex systems to
            create simple, powerful solutions — for over two decades.
          </p>
          <div className="mt-16 flex items-center gap-8">
            <Link
              href="/work"
              className="inline-flex h-[52px] items-center bg-ink px-10 text-[13px] font-medium text-paper transition-all duration-300 hover:bg-ink/85"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
            >
              Get in touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
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
      style={{ height: `${WORDS.length * 300 + 800}px` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-r from-paper to-paper-warm">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="text-[12px] font-medium uppercase tracking-[0.35em] text-muted"
          >
            T3 Technologies
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="mt-10 font-display text-[clamp(3rem,10vw,9rem)] leading-[1] tracking-[-0.02em]"
          >
            We build what
            <br />
            matters in
            <br />
            <span className="relative inline-block min-w-[3ch] overflow-hidden text-gold">
              <AnimatePresence mode="wait">
                {WORDS.map((word, i) => (
                  <WordItem
                    key={word}
                    word={word}
                    index={i}
                    wordIndex={wordIndex}
                  />
                ))}
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            className="mt-12 max-w-[440px] text-[15px] font-light leading-[1.85] tracking-[0.02em] text-muted/70"
          >
            Defying conventional wisdom. Deconstructing complex systems to
            create simple, powerful solutions — for over two decades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.95, ease }}
            className="mt-16 flex items-center gap-8"
          >
            <Link
              href="/work"
              className="inline-flex h-[52px] items-center bg-ink px-10 text-[13px] font-medium text-paper transition-all duration-300 hover:bg-ink/85"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
            >
              Get in touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="h-12 w-px bg-ink/20"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
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

  const clipPath = useTransform(wordIndex, (v: number) => {
    const diff = v - index;
    if (Math.abs(diff) > 0.5) {
      return diff > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)";
    }
    return "inset(0 0 0 0)";
  });

  return (
    <motion.span
      style={{ opacity, clipPath }}
      className="absolute left-0 top-0"
    >
      {word}
    </motion.span>
  );
}
