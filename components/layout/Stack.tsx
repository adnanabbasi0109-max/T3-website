import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Spacing between children */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
};

const GAP: Record<string, string> = {
  xs: "space-y-2",
  sm: "space-y-4",
  md: "space-y-6 sm:space-y-8",
  lg: "space-y-8 sm:space-y-12",
  xl: "space-y-12 sm:space-y-16 lg:space-y-20",
};

export default function Stack({
  children,
  className = "",
  gap = "md",
}: Props) {
  return (
    <div className={`${GAP[gap]} ${className}`}>
      {children}
    </div>
  );
}
