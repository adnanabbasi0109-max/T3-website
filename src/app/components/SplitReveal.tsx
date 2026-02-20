import { motion } from 'motion/react';

interface SplitRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
}

export function SplitReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: SplitRevealProps) {
  const yFrom = direction === 'up' ? '100%' : '-100%';

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: yFrom, opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
