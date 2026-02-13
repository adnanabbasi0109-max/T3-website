type Props = {
  className?: string;
  /** Use gold accent color */
  accent?: boolean;
  /** Spacing above and below */
  spacing?: "none" | "sm" | "md" | "lg";
};

const SPACING: Record<string, string> = {
  none: "",
  sm: "my-8 sm:my-12",
  md: "my-12 sm:my-16",
  lg: "my-16 sm:my-24",
};

export default function Divider({
  className = "",
  accent = false,
  spacing = "none",
}: Props) {
  return (
    <hr
      className={`border-0 border-t ${
        accent ? "border-gold/20" : "border-border"
      } ${SPACING[spacing]} ${className}`}
    />
  );
}
