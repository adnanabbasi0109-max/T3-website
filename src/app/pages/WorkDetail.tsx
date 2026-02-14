import { useParams, Link, Navigate } from 'react-router';
import { ArrowLeft, Play, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';
import { getWorkstoryBySlug, workstories } from '../data/workstories';

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
        <Link
          to="/work"
          className="inline-flex items-center text-t3-muted-gray hover:text-t3-near-black transition-colors mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Workstories
        </Link>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight mb-6">
              {workstory.title}
            </h1>
            <p className="text-xl md:text-2xl text-t3-muted-gray leading-relaxed mb-8">
              {workstory.summary}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {workstory.domains.map(domain => (
                <Tag key={domain} variant="gold">{domain}</Tag>
              ))}
            </div>
            {workstory.videoUrl && (
              <Button variant="secondary" className="inline-flex items-center">
                <Play size={18} className="mr-2" />
                Watch Video
              </Button>
            )}
          </div>

          <div className="md:col-span-4">
            <div className="bg-t3-soft-wash rounded-lg p-8 sticky top-24">
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
          </div>
        </div>
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
                className={`text-sm whitespace-nowrap transition-colors pb-1 ${
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
          {/* Overview */}
          <section id="overview" className="mb-24 scroll-mt-32">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
              Overview
            </h2>
            <p className="text-lg text-t3-muted-gray leading-relaxed">
              {workstory.summary}
            </p>
          </section>

          {/* Challenge */}
          {workstory.challenge && (
            <section id="challenge" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-t3-muted-gray leading-relaxed">
                {workstory.challenge}
              </p>
            </section>
          )}

          {/* Intervention */}
          {workstory.intervention && (
            <section id="intervention" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                The Intervention
              </h2>
              <p className="text-lg text-t3-muted-gray leading-relaxed">
                {workstory.intervention}
              </p>
            </section>
          )}

          {/* Execution */}
          {workstory.execution && (
            <section id="execution" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                What We Built
              </h2>
              <ul className="space-y-4">
                {workstory.execution.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-t3-accent-gold rounded-full mt-2.5 mr-4 flex-shrink-0" />
                    <span className="text-lg text-t3-muted-gray leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcome */}
          {(workstory.outcome || workstory.proofPoints) && (
            <section id="outcome" className="mb-24 scroll-mt-32">
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
                          className="px-3 py-1 rounded-full text-xs border border-t3-muted-gray/30 text-t3-muted-gray"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related Work */}
      {relatedWork.length > 0 && (
        <section className="bg-t3-soft-wash border-t border-t3-soft-divider">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-12">
              Related Workstories
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedWork.map(work => (
                <Link
                  key={work.slug}
                  to={`/work/${work.slug}`}
                  className="group block"
                >
                  <div className="bg-t3-soft-divider aspect-[4/3] rounded-lg mb-4 overflow-hidden border border-t3-soft-divider">
                    <div className="w-full h-full bg-gradient-to-br from-t3-soft-divider to-t3-soft-wash flex items-center justify-center group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-heading tracking-tight mb-2 group-hover:text-t3-muted-gray transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-t3-muted-gray line-clamp-2 mb-3">
                    {work.summary}
                  </p>
                  <div className="flex items-center text-sm text-t3-accent-gold">
                    View case study
                    <ArrowUpRight size={16} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}