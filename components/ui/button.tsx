import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

const VARIANT: Record<string, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-light active:bg-ink-muted",
  secondary:
    "border border-border text-ink hover:border-border-strong active:border-ink/25",
  ghost:
    "text-ink hover:bg-ink/[0.03] active:bg-ink/[0.05]",
  dark:
    "bg-paper text-ink hover:bg-paper-warm active:bg-paper-dim",
  "dark-outline":
    "border border-paper/12 text-paper hover:border-paper/25 hover:bg-paper/[0.03]",
};

const SIZE: Record<string, string> = {
  sm: "h-9 px-5 text-[12px] gap-1.5",
  md: "h-11 px-7 text-[13px] gap-2",
  lg: "h-[52px] px-10 text-[14px] gap-2.5",
};

type BaseProps = {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
  className?: string;
  children: ReactNode;
};

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
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-500 disabled:opacity-40 disabled:pointer-events-none ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

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
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-500 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

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
      className={`inline-flex items-center gap-1 text-[14px] font-medium text-ink underline decoration-border underline-offset-4 transition-colors duration-500 hover:decoration-ink ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
