import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { WorkstoryCard } from '../components/WorkstoryCard';
import { StatsStrip } from '../components/StatsStrip';
import { TiltCard } from '../components/TiltCard';
import { TextReveal } from '../components/TextReveal';

import { workstories } from '../data/workstories';
import { domains } from '../data/domains';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
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

const domainImages: Record<string, string> = {
  'business-innovations': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'brand-building': 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  'marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
  'design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'tech-solutions': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  'pr-media': 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&q=80',
};

export function Home() {
  const featuredWork = workstories.slice(0, 6);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  return (
    <div className="bg-t3-off-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Creative team collaborating"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-t3-off-white via-t3-off-white/70 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pb-20 md:pb-32 lg:pb-40 pt-48">
          <div className="max-w-4xl">
            <TextReveal
              text="For the moments when the playbook is obsolete and the future is unwritten."
              delay={0.3}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-[1.1] mb-6 md:mb-8 lg:mb-10"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-t3-muted-gray leading-relaxed mb-10 md:mb-12 max-w-3xl"
            >
              We defy conventional wisdom, deconstruct complex systems, and create simple,
              powerful solutions—forged at the intersection of data, creativity, and human behavior.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
      <section className="relative bg-t3-soft-wash border-y border-t3-soft-divider overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {domains.map(domain => (
            <motion.div key={domain.id} variants={staggerItem}>
              <TiltCard className="rounded-lg">
                <Link
                  to="/domains"
                  className="group block relative h-72 md:h-80 rounded-lg overflow-hidden"
                >
                  <img
                    src={domainImages[domain.id] || ''}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/20 transition-all duration-500" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-heading tracking-tight mb-3 text-white group-hover:text-t3-accent-gold transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-4">
                      {domain.description}
                    </p>
                    <div className="text-sm text-white/50 group-hover:text-white flex items-center transition-colors">
                      Explore <ArrowUpRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </div>
                </Link>
              </TiltCard>
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
                <TiltCard tiltDeg={4} className="rounded-lg">
                  <WorkstoryCard workstory={work} variant="featured" />
                </TiltCard>
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
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=70"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-t3-off-white/85" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 text-center">
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
