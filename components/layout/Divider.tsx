type Props = {
  className?: string;
  accent?: boolean;
  spacing?: "none" | "sm" | "md" | "lg";
};

const SPACING: Record<string, string> = {
  none: "",
  sm: "my-10 sm:my-14",
  md: "my-14 sm:my-20",
  lg: "my-20 sm:my-28",
};

export default function Divider({
  className = "",
  accent = false,
  spacing = "none",
}: Props) {
  return (
    <hr
      className={`border-0 border-t ${
        accent ? "border-accent/15" : "border-border"
      } ${SPACING[spacing]} ${className}`}
    />
  );
}
