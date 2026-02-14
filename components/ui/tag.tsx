import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export default function Tag({ children, className = "", active = false, onClick }: Props) {
  const base =
    "inline-flex items-center h-7 px-3.5 text-[11px] font-medium tracking-[0.02em] rounded-full border transition-all duration-500";

  const visual = active
    ? "border-ink bg-ink text-paper"
    : "border-border text-muted hover:border-border-strong hover:text-ink";

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${visual} ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <span className={`${base} ${visual} ${className}`}>
      {children}
    </span>
  );
}
