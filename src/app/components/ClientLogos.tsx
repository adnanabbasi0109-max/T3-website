import { motion } from 'motion/react';
import { clients } from '../data/clients';
import { TiltCard } from './TiltCard';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.05 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

interface ClientLogosProps {
  showTitle?: boolean;
  limit?: number;
  className?: string;
}

export function ClientLogos({ showTitle = true, limit, className = '' }: ClientLogosProps) {
  const displayClients = limit ? clients.slice(0, limit) : clients;

  return (
    <div className={className}>
      {showTitle && (
        <motion.div {...fadeIn} className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-t3-muted-gray mb-4">
            Trusted By
          </p>
          <h2 className="text-3xl md:text-4xl font-heading tracking-tight">
            75+ leading brands across industries
          </h2>
        </motion.div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12"
      >
        {displayClients.map((client) => (
          <motion.div
            key={client.name}
            variants={staggerItem}
          >
            <TiltCard className="rounded-lg" tiltDeg={8} scale={1.04}>
              <div className="flex items-center justify-center p-6 border border-t3-soft-divider rounded-lg bg-t3-soft-wash hover:border-t3-accent-gold/30 transition-colors group">
                <div className="text-center">
                  <h3 className="font-heading text-base md:text-lg tracking-tight group-hover:text-t3-accent-gold transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-xs text-t3-muted-gray mt-1 uppercase tracking-wider">
                    {client.category}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
