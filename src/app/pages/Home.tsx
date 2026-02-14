import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { WorkstoryCard } from '../components/WorkstoryCard';
import { StatsStrip } from '../components/StatsStrip';

import { workstories } from '../data/workstories';
import { domains } from '../data/domains';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const lineReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export function Home() {
  const featuredWork = workstories.slice(0, 6);

  return (
    <div className="bg-t3-off-white">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-12 md:pt-24 lg:pt-32 pb-20 md:pb-32 lg:pb-48">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-[1.1] mb-6 md:mb-8 lg:mb-10"
            >
              For the moments when the playbook is obsolete and the future is unwritten.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-t3-muted-gray leading-relaxed mb-10 md:mb-12 max-w-3xl"
            >
              We defy conventional wisdom, deconstruct complex systems, and create simple, 
              powerful solutions—forged at the intersection of data, creativity, and human behavior.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button to="/work" variant="primary">
                Explore Workstories
              </Button>
              <Button to="/about" variant="ghost">
                Our Doctrine <ArrowUpRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-t3-soft-wash border-y border-t3-soft-divider">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
          <StatsStrip />
        </div>
      </section>

      {/* Work Domains */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div {...fadeInUp}>
          <SectionHeader
            overline="What We Do"
            title="Work Domains"
            description="Six domains of expertise, countless possibilities for transformation."
            className="mb-16 md:mb-24"
          />
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {domains.map(domain => (
            <motion.div key={domain.id} variants={staggerItem}>
              <Link
                to="/domains"
                className="group block p-8 border border-t3-soft-divider rounded-lg hover:bg-t3-soft-wash hover:border-t3-accent-gold transition-all"
              >
                <h3 className="text-2xl font-heading tracking-tight mb-4 group-hover:text-t3-accent-gold transition-colors">
                  {domain.title}
                </h3>
                <p className="text-t3-muted-gray leading-relaxed">
                  {domain.description}
                </p>
                <div className="mt-6 text-sm text-t3-muted-gray group-hover:text-t3-near-black flex items-center">
                  Explore <ArrowUpRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Workstories */}
      <section className="bg-t3-soft-wash">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <motion.div {...fadeInUp} className="mb-16 md:mb-24">
            <div className="text-xs uppercase tracking-[0.2em] text-t3-muted-gray mb-6">
              Featured Work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">
              Workstories
            </h2>
            <p className="text-xl text-t3-muted-gray leading-relaxed max-w-3xl">
              A glance at work, workforce, and workstories. Case-study-first thinking 
              that turns challenges into opportunities.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 mb-12"
          >
            {featuredWork.map(work => (
              <motion.div key={work.slug} variants={staggerItem}>
                <WorkstoryCard workstory={work} variant="featured" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="text-center"
          >
            <Button to="/work" variant="secondary" className="border-t3-near-black text-t3-near-black hover:bg-t3-near-black/10">
              View All Workstories <ArrowUpRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Humane Technology Philosophy */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-12 gap-12"
        >
          <motion.div variants={staggerItem} className="md:col-span-5">
            <h2 className="text-4xl md:text-5xl font-heading tracking-tight mb-6">
              Humane Technology
            </h2>
            <Link 
              to="/about"
              className="text-t3-accent-gold hover:text-t3-muted-gray transition-colors inline-flex items-center"
            >
              Read our philosophy <ArrowUpRight className="ml-2" size={18} />
            </Link>
          </motion.div>
          <motion.div variants={staggerItem} className="md:col-span-7">
            <p className="text-xl md:text-2xl text-t3-muted-gray leading-relaxed mb-6">
              At T3, we believe in a harmonious blend of tradition and innovation. 
              We use technology to enhance the human experience, not replace it.
            </p>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              Our approach creates progress that is thoughtful and purposeful—where 
              machines amplify human creativity, empathy, and wisdom rather than 
              diminish them.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-t3-off-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 text-center">
          <motion.h2 
            {...fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-8 max-w-4xl mx-auto"
          >
            Tell us what you're building. We'll help you become a category of one.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button to="/contact" variant="primary" className="text-lg px-8 py-4">
              Start a conversation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}