import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** 'word' splits by word, 'line' animates as one block */
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export function TextReveal({ text, className = '', delay = 0, as: Tag = 'h1' }: TextRevealProps) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
            variants={wordVariants}
            className="inline-block mr-[0.25em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
