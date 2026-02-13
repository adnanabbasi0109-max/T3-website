import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

/* ── Shared style maps ── */
const VARIANT: Record<string, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-light active:bg-ink-light",
  secondary:
    "border border-border text-ink hover:border-ink/30 active:border-ink/40",
  ghost:
    "text-ink hover:bg-ink/[0.04] active:bg-ink/[0.06]",
  dark:
    "bg-paper text-ink hover:bg-paper-warm active:bg-paper-dim",
  "dark-outline":
    "border border-paper/20 text-paper hover:border-paper/40 hover:bg-paper/[0.04]",
};

const SIZE: Record<string, string> = {
  sm: "h-9 px-4 text-[12px] gap-1.5",
  md: "h-11 px-6 text-[13px] gap-2",
  lg: "h-[52px] px-8 text-[14px] gap-2.5",
};

type BaseProps = {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
  className?: string;
  children: ReactNode;
};

/* ── Button ── */
type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── ButtonLink (renders as <a>) ── */
type ButtonLinkProps = BaseProps & {
  href: string;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ── TextLink — inline underline link ── */
type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({ href, children, className = "", external }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-[14px] font-medium text-ink underline decoration-border underline-offset-4 transition-colors duration-300 hover:decoration-ink ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
