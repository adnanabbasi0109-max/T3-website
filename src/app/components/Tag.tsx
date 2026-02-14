interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs border ${
      variant === 'gold'
        ? 'border-t3-accent-gold text-t3-accent-gold bg-t3-accent-gold/5'
        : 'border-t3-soft-divider text-t3-muted-gray'
    }`}>
      {children}
    </span>
  );
}
