import type { ReactNode } from "react";

/* ── Display ── */
type DisplayProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

export function Display({ children, className = "", as: Tag = "h1" }: DisplayProps) {
  return (
    <Tag
      className={`font-display text-[clamp(3rem,8vw,7rem)] leading-[0.98] tracking-[-0.035em] ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ── Heading ── */
type HeadingProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "xl" | "lg" | "md" | "sm";
};

const HEADING_SIZE: Record<string, string> = {
  xl: "font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] tracking-[-0.03em]",
  lg: "font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.025em]",
  md: "font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15] tracking-[-0.02em]",
  sm: "text-[clamp(1rem,1.5vw,1.25rem)] font-semibold leading-[1.3] tracking-[-0.015em]",
};

export function Heading({ children, className = "", as: Tag = "h2", size = "lg" }: HeadingProps) {
  return (
    <Tag className={`${HEADING_SIZE[size]} ${className}`}>
      {children}
    </Tag>
  );
}

/* ── Body ── */
type BodyProps = {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
  muted?: boolean;
};

const BODY_SIZE: Record<string, string> = {
  lg: "text-[17px] leading-[1.85] sm:text-[18px]",
  md: "text-[15px] leading-[1.85] sm:text-base",
  sm: "text-[13px] leading-[1.75] sm:text-[14px]",
};

export function Body({ children, className = "", size = "md", muted = false }: BodyProps) {
  return (
    <p className={`${BODY_SIZE[size]} ${muted ? "text-muted" : ""} ${className}`}>
      {children}
    </p>
  );
}

/* ── Caption / Label ── */
type CaptionProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
};

export function Caption({ children, className = "", as: Tag = "p" }: CaptionProps) {
  return (
    <Tag
      className={`text-[11px] font-medium uppercase tracking-[0.15em] text-muted ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ── Eyebrow — small accent label above headings ── */
type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:mb-6 ${className}`}
    >
      {children}
    </p>
  );
}
