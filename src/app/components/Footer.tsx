import { Link } from 'react-router';
import { motion } from 'motion/react';
const t3Logo = '/logo.png';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export function Footer() {
  return (
    <footer className="bg-t3-off-white">
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-t3-accent-gold/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <motion.div {...fadeInUp} className="md:col-span-7">
            <img
              src={t3Logo}
              alt="T3 The Think Tank - Humane Technology"
              className="h-12 md:h-14 w-auto mb-6"
            />
            <p className="text-sm text-t3-muted-gray leading-relaxed max-w-md">
              At T3, we believe in a harmonious blend of tradition and innovation.
              We use technology to enhance the human experience, creating progress
              that is thoughtful and purposeful.
            </p>
          </motion.div>

          {/* Quick Links */}
          <div className="md:col-span-5">
            <motion.h4
              {...fadeInUp}
              className="text-sm uppercase tracking-widest mb-6 text-t3-near-black font-medium"
            >
              Navigate
            </motion.h4>
            <motion.ul
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                { to: '/work', label: 'Workstories' },
                { to: '/domains', label: 'Domains' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' }
              ].map(link => (
                <motion.li key={link.to} variants={staggerItem}>
                  <Link
                    to={link.to}
                    className="text-t3-muted-gray hover:text-t3-near-black transition-colors duration-300 relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-t3-accent-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 border-t border-t3-soft-divider flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <p className="text-sm text-t3-muted-gray">
            &copy; {new Date().getFullYear()} T3 Technologies. All rights reserved.
          </p>
          <a
            href="https://www.t-3.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-t3-muted-gray hover:text-t3-near-black transition-colors duration-300 relative group"
          >
            www.t-3.in
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-t3-accent-gold transition-all duration-300 group-hover:w-full" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
