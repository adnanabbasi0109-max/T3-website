import { useParams, Link, Navigate } from 'react-router';
import { ArrowLeft, Play, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Tag } from '../components/Tag';
import { TiltCard } from '../components/TiltCard';
import { getWorkstoryBySlug, workstories } from '../data/workstories';

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/);
  return match ? match[1] : null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function WorkDetail() {
  const { slug } = useParams();
  const workstory = slug ? getWorkstoryBySlug(slug) : null;
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'challenge', 'intervention', 'execution', 'outcome'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!workstory) {
    return <Navigate to="/work" replace />;
  }

  const relatedWork = workstories
    .filter(w =>
      w.slug !== workstory.slug &&
      (w.domains.some(d => workstory.domains.includes(d)) ||
       w.industries.some(i => workstory.industries.includes(i)))
    )
    .slice(0, 3);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-t3-off-white">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-12 md:pt-16 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/work"
            className="inline-flex items-center text-t3-muted-gray hover:text-t3-near-black transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Workstories
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight mb-6"
            >
              {workstory.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-t3-muted-gray leading-relaxed mb-8"
            >
              {workstory.summary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {workstory.domains.map(domain => (
                <Tag key={domain} variant="gold">{domain}</Tag>
              ))}
            </motion.div>
            {workstory.videoUrl && getYouTubeId(workstory.videoUrl) && (
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={workstory.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-md border border-t3-soft-divider text-t3-near-black hover:bg-t3-soft-wash hover:border-t3-accent-gold transition-all duration-300"
              >
                <Play size={18} className="mr-2" />
                Watch Video
              </motion.a>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <TiltCard className="rounded-lg sticky top-24" tiltDeg={5} scale={1.01}>
              <div className="bg-t3-soft-wash rounded-lg p-8">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-t3-muted-gray mb-2">
                      Location
                    </div>
                    <div className="text-lg">{workstory.location}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-t3-muted-gray mb-2">
                      Industries
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {workstory.industries.map(industry => (
                        <Tag key={industry}>{industry}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Hero Image */}
        {workstory.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-lg overflow-hidden border border-t3-soft-divider"
          >
            <img
              src={workstory.image}
              alt={workstory.title}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        )}
      </section>

      {/* Navigation */}
      <section className="border-y border-t3-soft-divider bg-t3-off-white sticky top-20 z-40 overflow-x-auto">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <nav className="flex gap-6 md:gap-8 py-4 min-w-max md:min-w-0">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'challenge', label: 'Challenge' },
              { id: 'intervention', label: 'Intervention' },
              { id: 'execution', label: 'Execution' },
              { id: 'outcome', label: 'Outcome' }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm whitespace-nowrap transition-all duration-300 pb-1 ${
                  activeSection === section.id
                    ? 'text-t3-near-black border-b-2 border-t3-accent-gold'
                    : 'text-t3-muted-gray hover:text-t3-near-black'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Video */}
          {workstory.videoUrl && getYouTubeId(workstory.videoUrl) && (
            <motion.section {...fadeInUp} className="mb-16 scroll-mt-32">
              <div className="aspect-video rounded-lg overflow-hidden border border-t3-soft-divider">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(workstory.videoUrl)}`}
                  title={workstory.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.section>
          )}

          {/* Overview */}
          <motion.section {...fadeInUp} id="overview" className="mb-24 scroll-mt-32">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
              Overview
            </h2>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              {workstory.summary}
            </p>
          </motion.section>

          {/* Challenge */}
          {workstory.challenge && (
            <motion.section {...fadeInUp} id="challenge" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-t3-muted-gray leading-relaxed">
                {workstory.challenge}
              </p>
            </motion.section>
          )}

          {/* Intervention */}
          {workstory.intervention && (
            <motion.section {...fadeInUp} id="intervention" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                The Intervention
              </h2>
              <p className="text-lg text-t3-muted-gray leading-relaxed">
                {workstory.intervention}
              </p>
            </motion.section>
          )}

          {/* Execution */}
          {workstory.execution && (
            <motion.section
              id="execution"
              className="mb-24 scroll-mt-32"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                What We Built
              </motion.h2>
              <ul className="space-y-4">
                {workstory.execution.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={staggerItem}
                    className="flex items-start"
                  >
                    <span className="inline-block w-2 h-2 bg-t3-accent-gold rounded-full mt-2.5 mr-4 flex-shrink-0" />
                    <span className="text-lg text-t3-muted-gray leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Outcome */}
          {(workstory.outcome || workstory.proofPoints) && (
            <motion.section
              {...fadeInUp}
              id="outcome"
              className="mb-24 scroll-mt-32"
            >
              <TiltCard className="rounded-lg" tiltDeg={3} scale={1.01}>
              <div className="bg-t3-near-black text-t3-off-white rounded-lg p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                  Outcome
                </h2>
                {workstory.outcome && (
                  <p className="text-xl mb-8 text-t3-accent-gold">
                    {workstory.outcome}
                  </p>
                )}
                {workstory.proofPoints && workstory.proofPoints.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-t3-muted-gray mb-4">
                      Impact
                    </h3>
                    <ul className="space-y-3">
                      {workstory.proofPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-t3-accent-gold rounded-full mt-2.5 mr-3 flex-shrink-0" />
                          <span className="text-t3-muted-gray">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {workstory.services && workstory.services.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-t3-muted-gray/30">
                    <h3 className="text-sm uppercase tracking-widest text-t3-muted-gray mb-4">
                      Services Deployed
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {workstory.services.map(service => (
                        <span
                          key={service}
                          className="px-3 py-1 rounded-full text-xs border border-t3-muted-gray/30 text-t3-muted-gray hover:border-t3-accent-gold/50 hover:text-t3-accent-gold transition-colors duration-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </TiltCard>
            </motion.section>
          )}
        </div>
      </div>

      {/* Related Work */}
      {relatedWork.length > 0 && (
        <section className="bg-t3-soft-wash border-t border-t3-soft-divider">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
            <motion.h2
              {...fadeInUp}
              className="text-3xl md:text-4xl font-heading tracking-tight mb-12"
            >
              Related Workstories
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {relatedWork.map(work => (
                <motion.div key={work.slug} variants={staggerItem}>
                  <TiltCard className="rounded-lg" tiltDeg={6} scale={1.03}>
                    <Link
                      to={`/work/${work.slug}`}
                      className="group block p-6 rounded-lg border border-transparent hover:border-t3-soft-divider hover:bg-t3-off-white transition-all duration-300"
                    >
                      <h3 className="text-xl font-heading tracking-tight mb-2 group-hover:text-t3-muted-gray transition-colors duration-300">
                        {work.title}
                      </h3>
                      <p className="text-sm text-t3-muted-gray line-clamp-2 mb-3">
                        {work.summary}
                      </p>
                      <div className="flex items-center text-sm text-t3-accent-gold">
                        View case study
                        <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
