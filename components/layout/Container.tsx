import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  /** "wide" for edge-to-edge heroes, "narrow" for prose, default for content */
  size?: "default" | "wide" | "narrow";
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  size = "default",
}: Props) {
  const maxW =
    size === "wide"
      ? "max-w-[1400px]"
      : size === "narrow"
        ? "max-w-[720px]"
        : "max-w-[1120px]";

  return (
    <Tag className={`mx-auto w-full ${maxW} px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
