import { useEffect, useRef, useState } from 'react';

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
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

    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animate();
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-2">
      {count}{suffix}
    </div>
  );
}

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
        <div key={index} className="text-center md:text-left">
          <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
          <div className="text-sm uppercase tracking-widest text-t3-muted-gray">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}