import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: Props) {
  return (
    <Tag className={`mx-auto w-full max-w-[1200px] px-6 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
