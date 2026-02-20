import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

function CountUp({ end, duration = 2000, suffix = '', delay = 0 }: { end: number; duration?: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animate();
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, end, duration, delay]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-2">
      {count}{suffix}
    </div>
  );
}

const statItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const }
};

export function StatsStrip() {
  const stats = [
    { value: 20, suffix: '+', label: 'Years' },
    { value: 300, suffix: '+', label: 'Projects' },
    { value: 75, suffix: '+', label: 'Clients' },
    { value: 95, suffix: '%', label: 'Retention' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          {...statItem}
          transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center md:text-left group"
        >
          <div className="relative">
            <CountUp end={stat.value} suffix={stat.suffix} duration={2000} delay={index * 150} />
            <motion.div
              className="h-px bg-t3-accent-gold/30 mt-2 mb-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ originX: 0 }}
            />
          </div>
          <div className="text-sm uppercase tracking-widest text-t3-muted-gray">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
