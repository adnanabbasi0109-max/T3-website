import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticWrap } from './MagneticWrap';
const t3Logo = '/logo.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const links = [
    { path: '/work', label: 'Workstories' },
    { path: '/domains', label: 'Domains' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-t3-off-white/95 backdrop-blur-sm border-b border-t3-soft-divider">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <motion.img
              src={t3Logo}
              alt="T3 The Think Tank - Humane Technology"
              className="h-10 md:h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors relative group ${
                  isActive(link.path)
                    ? 'text-t3-near-black'
                    : 'text-t3-muted-gray hover:text-t3-near-black'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-t3-accent-gold transition-all duration-300 ease-out ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <MagneticWrap strength={0.3}>
              <motion.div
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-t3-near-black text-t3-off-white text-sm rounded-full hover:bg-t3-near-black/80 transition-all duration-300 border border-t3-near-black hover:border-t3-accent-gold hover:shadow-[0_0_20px_rgba(198,161,91,0.15)]"
                >
                  Start a conversation
                </Link>
              </motion.div>
            </MagneticWrap>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-t3-soft-wash rounded-lg transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-20 bg-t3-off-white z-40 px-6 py-8 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div className="flex flex-col gap-6">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-4xl font-heading tracking-tight block transition-colors duration-300 ${
                      isActive(link.path)
                        ? 'text-t3-near-black'
                        : 'text-t3-muted-gray hover:text-t3-near-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-8 px-6 py-4 bg-t3-near-black text-t3-off-white text-center rounded-full border border-t3-soft-divider block"
                >
                  Start a conversation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
