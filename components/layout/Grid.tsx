import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Number of columns at lg breakpoint */
  cols?: 1 | 2 | 3 | 4;
  /** Gap between items */
  gap?: "sm" | "md" | "lg" | "xl";
};

const COLS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const GAP: Record<string, string> = {
  sm: "gap-4 sm:gap-6",
  md: "gap-6 sm:gap-8 lg:gap-10",
  lg: "gap-8 sm:gap-10 lg:gap-14",
  xl: "gap-10 sm:gap-14 lg:gap-20",
};

export default function Grid({
  children,
  className = "",
  cols = 2,
  gap = "md",
}: Props) {
  return (
    <div className={`grid ${COLS[cols]} ${GAP[gap]} ${className}`}>
      {children}
    </div>
  );
}
