"use client";

import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  speed?: number;
  className?: string;
  separator?: string;
  reverse?: boolean;
};

export default function Marquee({
  text,
  speed = 40,
  className = "",
  separator = " \u00b7 ",
  reverse = false,
}: Props) {
  const reduced = useReducedMotion();

  const content = `${text}${separator}`.repeat(6);

  if (reduced) {
    return (
      <div className={`overflow-hidden whitespace-nowrap ${className}`}>
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={
          { "--marquee-speed": `${speed}s` } as React.CSSProperties
        }
      >
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
