import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  size?: "default" | "wide" | "narrow" | "full" | "xl";
};

const MAX_W: Record<string, string> = {
  full: "",
  xl: "max-w-[1440px]",
  wide: "max-w-[1280px]",
  default: "max-w-[1120px]",
  narrow: "max-w-[720px]",
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  size = "default",
}: Props) {
  return (
    <Tag
      className={`mx-auto w-full ${MAX_W[size]} px-6 sm:px-10 lg:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
