import { Link } from 'react-router';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({ 
  children, 
  variant = 'primary', 
  href, 
  to, 
  onClick, 
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:ring-offset-2 focus:ring-offset-t3-off-white';
  
  const variantStyles = {
    primary: 'bg-t3-near-black text-t3-off-white hover:bg-t3-near-black/80 border border-t3-near-black hover:border-t3-accent-gold',
    secondary: 'border border-t3-soft-divider text-t3-near-black hover:bg-t3-soft-wash hover:border-t3-accent-gold',
    ghost: 'text-t3-near-black hover:text-t3-muted-gray underline underline-offset-4'
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={styles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}