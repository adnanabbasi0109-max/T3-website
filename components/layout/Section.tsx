import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  dark?: boolean;
  alt?: boolean;
  as?: "section" | "div" | "article" | "aside";
  id?: string;
};

const SPACING: Record<string, string> = {
  none: "",
  sm: "py-16 sm:py-24",
  md: "py-24 sm:py-36 lg:py-44",
  lg: "py-32 sm:py-48 lg:py-56",
  xl: "py-40 sm:py-56 lg:py-72",
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
