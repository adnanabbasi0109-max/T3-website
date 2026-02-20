import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { Tag } from '../components/Tag';
import { TiltCard } from '../components/TiltCard';
import { Spotlight } from '../components/Spotlight';
import { SplitReveal } from '../components/SplitReveal';
import { SectionDivider } from '../components/SectionDivider';
import { domains } from '../data/domains';
import { workstories } from '../data/workstories';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export function Domains() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const getWorkstoriesForDomain = (domainTitle: string) => {
    return workstories.filter(w => w.domains.includes(domainTitle));
  };

  return (
    <div className="bg-t3-off-white">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            overline="What We Do"
            title="Work Domains"
            description="Six domains of expertise where we help organizations transform challenges into opportunities."
          />
        </motion.div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Domains Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {domains.map((domain, index) => {
            const domainWork = getWorkstoriesForDomain(domain.title);
            const isExpanded = selectedDomain === domain.id;

            return (
              <motion.div
                key={domain.id}
                variants={staggerItem}
                className="border border-t3-soft-divider rounded-lg overflow-hidden transition-all duration-300 hover:border-t3-accent-gold/30"
              >
                <button
                  onClick={() => setSelectedDomain(isExpanded ? null : domain.id)}
                  className="w-full p-8 md:p-12 text-left hover:bg-t3-soft-wash transition-all duration-300 group/domain"
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-t3-muted-gray font-mono transition-colors duration-300 group-hover/domain:text-t3-accent-gold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-heading tracking-tight transition-colors duration-300 group-hover/domain:text-t3-accent-gold">
                          {domain.title}
                        </h3>
                      </div>
                      <p className="text-lg text-t3-muted-gray mb-4">
                        {domain.description}
                      </p>
                      <p className="text-base text-t3-muted-gray leading-relaxed max-w-3xl">
                        {domain.longDescription}
                      </p>
                    </div>
                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover/domain:translate-x-1 group-hover/domain:-translate-y-1'}`}>
                      <ArrowUpRight size={24} className="text-t3-muted-gray group-hover/domain:text-t3-accent-gold transition-colors duration-300" />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && domainWork.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-t3-soft-divider bg-t3-soft-wash overflow-hidden"
                    >
                      <div className="p-8 md:p-12">
                        <h4 className="text-sm uppercase tracking-widest text-t3-muted-gray mb-6">
                          Related Workstories ({domainWork.length})
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          {domainWork.map(work => (
                            <TiltCard key={work.slug} className="rounded-lg" tiltDeg={20} scale={1.05}>
                              <div className="bg-t3-off-white p-6 rounded-lg border border-t3-soft-divider hover:border-t3-accent-gold transition-all duration-300 hover:shadow-[0_8px_30px_rgba(198,161,91,0.08)]">
                                <h5 className="text-xl font-heading tracking-tight mb-3">
                                  {work.title}
                                </h5>
                                <p className="text-sm text-t3-muted-gray mb-4 line-clamp-2">
                                  {work.summary}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {work.industries.map(industry => (
                                    <Tag key={industry}>{industry}</Tag>
                                  ))}
                                </div>
                                <Link to={`/work/${work.slug}`} className="text-sm p-0 flex items-center group/link text-t3-muted-gray hover:text-t3-accent-gold transition-colors duration-300">
                                  View case study <ArrowUpRight className="ml-1 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" size={14} />
                                </Link>
                              </div>
                            </TiltCard>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <Spotlight size={500} color="rgba(198, 161, 91, 0.06)">
        <section className="bg-t3-near-black text-t3-off-white border-t border-t3-soft-divider">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 text-center">
            <SplitReveal>
              <h2 className="text-4xl md:text-5xl font-heading tracking-tight mb-6 max-w-3xl mx-auto">
                Ready to transform your challenge into an opportunity?
              </h2>
            </SplitReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                className="inline-block"
              >
                <Link to="/contact" className="inline-block border border-t3-off-white text-t3-off-white hover:bg-t3-off-white/10 hover:border-t3-accent-gold hover:shadow-[0_0_20px_rgba(198,161,91,0.15)] px-6 py-3 rounded-lg font-heading tracking-tight transition-all duration-300">
                  Start a conversation
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Spotlight>
    </div>
  );
}