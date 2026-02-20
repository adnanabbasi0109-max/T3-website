import { useState } from 'react';
import { motion } from 'motion/react';
import { WorkstoryCard } from '../components/WorkstoryCard';
import { FiltersBar, type FilterState } from '../components/FiltersBar';
import { SectionHeader } from '../components/SectionHeader';
import { SectionDivider } from '../components/SectionDivider';
import { Marquee } from '../components/Marquee';
import { workstories } from '../data/workstories';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function WorkIndex() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    domain: '',
    industry: '',
    featured: false,
    sort: 'recent'
  });

  const filteredWorkstories = workstories.filter(story => {
    if (filters.search && 
        !story.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !story.summary.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.domain && !story.domains.includes(filters.domain)) {
      return false;
    }
    if (filters.industry && !story.industries.includes(filters.industry)) {
      return false;
    }
    if (filters.featured && !story.featured) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-t3-off-white">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            overline="Our Work"
            title="Workstories"
            description="A glance at work, workforce, and workstories. Case studies of transformation, innovation, and impact."
          />
        </motion.div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Filters */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <FiltersBar onFilterChange={setFilters} />
        </motion.div>
      </section>

      {/* Results */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 text-sm text-t3-muted-gray"
        >
          Showing {filteredWorkstories.length} {filteredWorkstories.length === 1 ? 'workstory' : 'workstories'}
        </motion.div>

        {filteredWorkstories.length > 0 ? (
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            key={JSON.stringify(filters)}
          >
            {filteredWorkstories.map(workstory => (
              <motion.div variants={staggerItem} key={workstory.slug}>
                <WorkstoryCard workstory={workstory} variant="row" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24"
          >
            <p className="text-xl text-t3-muted-gray">
              No workstories found matching your filters.
            </p>
            <p className="text-t3-muted-gray mt-4">
              Try adjusting your search criteria.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}