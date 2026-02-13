import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  dark?: boolean;
  /** Light alt background (paper-warm) */
  alt?: boolean;
  as?: "section" | "div" | "article" | "aside";
  id?: string;
};

const SPACING: Record<string, string> = {
  none: "",
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28 lg:py-36",
  lg: "py-24 sm:py-36 lg:py-44",
  xl: "py-32 sm:py-44 lg:py-56",
};

export default function Section({
  children,
  className = "",
  spacing = "lg",
  dark = false,
  alt = false,
  as: Tag = "section",
  id,
}: Props) {
  const bg = dark
    ? "dark-section"
    : alt
      ? "bg-paper-warm"
      : "";

  return (
    <Tag
      id={id}
      className={`${bg} ${SPACING[spacing]} ${className}`}
    >
      {children}
    </Tag>
  );
}
