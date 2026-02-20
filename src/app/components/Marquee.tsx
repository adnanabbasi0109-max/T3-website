import { motion } from 'motion/react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export function Marquee({
  items,
  speed = 30,
  separator = '·',
  className = '',
  reverse = false
}: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;
  // Duplicate for seamless loop
  const doubled = content + content;
  const duration = items.length * speed / items.length * 3;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear'
          }
        }}
      >
        <span className="inline-block text-sm md:text-base uppercase tracking-[0.3em] font-medium">
          {doubled}
        </span>
      </motion.div>
    </div>
  );
}
