import { motion } from 'motion/react';

interface SectionDividerProps {
  className?: string;
  variant?: 'line' | 'gradient' | 'dots';
}

export function SectionDivider({ className = '', variant = 'line' }: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-3 py-8 ${className}`}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-t3-accent-gold/40"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`relative py-4 ${className}`}>
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-t3-accent-gold/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    );
  }

  return (
    <div className={`max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 ${className}`}>
      <motion.div
        className="h-px bg-t3-soft-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        style={{ originX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
