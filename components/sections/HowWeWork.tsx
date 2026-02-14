"use client";

import Reveal from "../motion/Reveal";
import Container from "../layout/Container";
import Section from "../layout/Section";

const STEPS = [
  {
    number: "01",
    title: "Listen & Understand",
    description:
      "We begin every engagement by listening — deeply. Understanding your brand, your market, and the real challenge behind the brief.",
  },
  {
    number: "02",
    title: "Strategy & Craft",
    description:
      "We pair strategic thinking with creative craft. Every decision is deliberate, every detail purposeful — no filler, no fluff.",
  },
  {
    number: "03",
    title: "Document & Deliver",
    description:
      "Every project becomes a workstory — documented proof of outcomes. We measure what matters and deliver what we promise.",
  },
];

export default function HowWeWork() {
  return (
    <Section spacing="lg" alt className="mx-4 rounded-[1.5rem] sm:mx-6 sm:rounded-[2rem] lg:mx-10">
      <Container>
        <Reveal>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Our Process
          </p>
          <h2 className="max-w-lg font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.03em]">
            How we work
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.85] text-muted sm:text-[16px]">
            Three principles that guide every engagement — from first
            conversation to documented outcome.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 sm:mt-24 sm:grid-cols-3 sm:gap-8 lg:gap-16">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div>
                <span className="text-[13px] font-bold tabular-nums text-accent">
                  {step.number}
                </span>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] sm:text-[20px]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.85] text-muted sm:text-[15px]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
