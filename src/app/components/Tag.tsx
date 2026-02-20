interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs border transition-all duration-300 hover:scale-105 ${
      variant === 'gold'
        ? 'border-t3-accent-gold text-t3-accent-gold bg-t3-accent-gold/5 hover:bg-t3-accent-gold/10 hover:shadow-[0_0_12px_rgba(198,161,91,0.15)]'
        : 'border-t3-soft-divider text-t3-muted-gray hover:border-t3-muted-gray hover:text-t3-near-black'
    }`}>
      {children}
    </span>
  );
}
