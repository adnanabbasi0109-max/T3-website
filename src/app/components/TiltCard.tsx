import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDeg?: number;
  glare?: boolean;
  scale?: number;
}

export function TiltCard({
  children,
  className = '',
  tiltDeg = 6,
  glare = true,
  scale = 1.02
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      rotateX: (0.5 - y) * tiltDeg * 2,
      rotateY: (x - 0.5) * tiltDeg * 2
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovering ? scale : 1
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      {glare && isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(198,161,91,0.08) 0%, transparent 60%)`,
            opacity: isHovering ? 1 : 0
          }}
        />
      )}
    </motion.div>
  );
}
