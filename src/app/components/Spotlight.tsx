import { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'motion/react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export function Spotlight({
  children,
  className = '',
  size = 400,
  color = 'rgba(198, 161, 91, 0.06)'
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(${size}px circle at var(--x) var(--y), ${color}, transparent 70%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          '--x': x as unknown as string,
          '--y': y as unknown as string,
        } as Record<string, unknown>}
        transition={{ opacity: { duration: 0.3 } }}
      />
      {children}
    </div>
  );
}
