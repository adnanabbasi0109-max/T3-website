import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  /** "full" for edge-to-edge, "xl" for 1600px, "wide" for 1400px, "default" for content, "narrow" for prose */
  size?: "default" | "wide" | "narrow" | "full" | "xl";
};

const MAX_W: Record<string, string> = {
  full: "",
  xl: "max-w-[1440px]",
  wide: "max-w-[1280px]",
  default: "max-w-[1080px]",
  narrow: "max-w-[680px]",
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  size = "default",
}: Props) {
  return (
    <Tag
      className={`mx-auto w-full ${MAX_W[size]} px-6 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
