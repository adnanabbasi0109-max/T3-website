import { Link } from 'react-router';
import { motion } from 'motion/react';
import { MagneticWrap } from './MagneticWrap';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const hoverTap = {
  whileHover: { scale: 1.04, y: -1 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }
};

export function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:ring-offset-2 focus:ring-offset-t3-off-white';

  const variantStyles = {
    primary: 'bg-t3-near-black text-t3-off-white hover:bg-t3-near-black/80 border border-t3-near-black hover:border-t3-accent-gold hover:shadow-[0_0_20px_rgba(198,161,91,0.15)]',
    secondary: 'border border-t3-soft-divider text-t3-near-black hover:bg-t3-soft-wash hover:border-t3-accent-gold hover:shadow-[0_0_20px_rgba(198,161,91,0.1)]',
    ghost: 'text-t3-near-black hover:text-t3-muted-gray underline underline-offset-4'
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <MagneticWrap strength={0.25}>
        <motion.div {...hoverTap} className="inline-block">
          <Link to={to} className={styles}>
            {children}
          </Link>
        </motion.div>
      </MagneticWrap>
    );
  }

  if (href) {
    return (
      <MagneticWrap strength={0.25}>
        <motion.div {...hoverTap} className="inline-block">
          <a href={href} className={styles} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </motion.div>
      </MagneticWrap>
    );
  }

  return (
    <MagneticWrap strength={0.25}>
      <motion.button
        type={type}
        onClick={onClick}
        className={styles}
        {...hoverTap}
      >
        {children}
      </motion.button>
    </MagneticWrap>
  );
}
