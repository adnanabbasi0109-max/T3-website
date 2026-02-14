import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { StatsStrip } from '../components/StatsStrip';
import { Button } from '../components/Button';


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
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const lineReveal = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function About() {
  return (
    <div className="bg-t3-off-white">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.2em] text-t3-muted-gray mb-6 md:mb-8"
            >
              About T3
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-[1.1] mb-8"
            >
              We are not a consultancy. We are a catalyst process.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* The Doctrine */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-12 gap-12"
        >
          <motion.div variants={staggerItem} className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tight sticky top-24">
              The Doctrine
            </h2>
          </motion.div>
          <motion.div variants={staggerItem} className="md:col-span-8 space-y-6">
            <p className="text-xl md:text-2xl text-t3-muted-gray leading-relaxed">
              T3 Technologies defies conventional wisdom. We deconstruct complex systems 
              to create simple, powerful solutions.
            </p>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              Our methodology exists at the intersection of data, creativity, and human 
              behavior. We don't just solve problems—we reimagine them. We find the inflection 
              points where small changes create exponential impact.
            </p>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              This is catalyst thinking: transforming organizational challenges into 
              competitive advantages through strategic interventions that others overlook.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-t3-near-black text-t3-off-white border-y border-t3-soft-divider">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <SectionHeader
            overline="Proof Points"
            title="Two decades of transformation"
            className="mb-16 md:mb-20"
          />
          <StatsStrip />
        </div>
      </section>

      {/* Humane Technology */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tight sticky top-24">
              Humane Technology
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-xl md:text-2xl text-t3-muted-gray leading-relaxed">
              At T3, we believe in a harmonious blend of tradition and innovation. 
              Our approach to technology is rooted in enhancing the human experience, 
              not replacing it.
            </p>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              We deploy technology as a catalyst for human potential. Machine learning 
              doesn't replace human insight—it amplifies it. Automation doesn't eliminate 
              creativity—it liberates it. Digital platforms don't reduce human connection—they 
              scale it.
            </p>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              This is humane technology: progress that is thoughtful and purposeful, where 
              machines enhance human creativity, empathy, and wisdom rather than diminish them.
            </p>
            <div className="pt-8">
              <div className="inline-block px-6 py-3 border-2 border-t3-accent-gold rounded-lg">
                <p className="text-sm uppercase tracking-widest text-t3-accent-gold">
                  Technology enhances humans, doesn't replace them
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Work Approach */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:pb-32">
        <SectionHeader
          overline="How We Work"
          title="Workstories, Not Case Studies"
          description="We think case-study-first. Every project is a story of transformation."
          className="mb-16"
        />
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="p-8 bg-t3-soft-wash rounded-lg">
            <div className="text-sm uppercase tracking-widest text-t3-muted-gray mb-4">
              01
            </div>
            <h3 className="text-2xl font-heading tracking-tight mb-4">
              Deconstruct
            </h3>
            <p className="text-t3-muted-gray leading-relaxed">
              We break down complex challenges into fundamental components, 
              identifying the leverage points others miss.
            </p>
          </div>
          <div className="p-8 bg-t3-soft-wash rounded-lg">
            <div className="text-sm uppercase tracking-widest text-t3-muted-gray mb-4">
              02
            </div>
            <h3 className="text-2xl font-heading tracking-tight mb-4">
              Catalyze
            </h3>
            <p className="text-t3-muted-gray leading-relaxed">
              We create strategic interventions at the intersection of data, 
              creativity, and human behavior.
            </p>
          </div>
          <div className="p-8 bg-t3-soft-wash rounded-lg">
            <div className="text-sm uppercase tracking-widest text-t3-muted-gray mb-4">
              03
            </div>
            <h3 className="text-2xl font-heading tracking-tight mb-4">
              Transform
            </h3>
            <p className="text-t3-muted-gray leading-relaxed">
              We deliver solutions that create lasting competitive advantage 
              and exponential impact.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-t3-near-black text-t3-off-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-8 max-w-4xl mx-auto">
            Let's talk about the inflection point you're facing
          </h2>
          <Button to="/contact" variant="secondary" className="border-t3-off-white text-t3-off-white hover:bg-t3-off-white/10">
            Start a conversation
          </Button>
        </div>
      </section>
    </div>
  );
}