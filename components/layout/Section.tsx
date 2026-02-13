import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Vertical padding size */
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  /** Dark background variant */
  dark?: boolean;
  /** Use as a specific HTML element */
  as?: "section" | "div" | "article" | "aside";
  id?: string;
};

const SPACING: Record<string, string> = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24 lg:py-28",
  lg: "py-20 sm:py-28 lg:py-36",
  xl: "py-24 sm:py-36 lg:py-44",
};

export default function Section({
  children,
  className = "",
  spacing = "lg",
  dark = false,
  as: Tag = "section",
  id,
}: Props) {
  return (
    <Tag
      id={id}
      className={`${dark ? "dark-section" : ""} ${SPACING[spacing]} ${className}`}
    >
      {children}
    </Tag>
  );
}
