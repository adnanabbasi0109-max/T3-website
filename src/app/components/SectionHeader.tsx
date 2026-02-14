interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ overline, title, description, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      {overline && (
        <div className="text-xs uppercase tracking-[0.2em] text-t3-muted-gray mb-4 md:mb-6">
          {overline}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-t3-muted-gray leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
