import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Tag } from './Tag';
import type { Workstory } from '../data/workstories';

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/);
  return match ? match[1] : null;
}

interface WorkstoryCardProps {
  workstory: Workstory;
  variant?: 'row' | 'featured';
}

export function WorkstoryCard({ workstory, variant = 'row' }: WorkstoryCardProps) {
  const videoId = workstory.videoUrl ? getYouTubeId(workstory.videoUrl) : null;

  if (variant === 'featured') {
    return (
      <div className="group block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[16/10] rounded-lg mb-6 overflow-hidden border border-t3-soft-divider relative"
        >
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={workstory.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : workstory.image ? (
            <img
              src={workstory.image}
              alt={workstory.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-t3-soft-divider to-t3-soft-wash flex items-center justify-center text-t3-muted-gray">
              <span className="text-sm uppercase tracking-widest">Featured Work</span>
            </div>
          )}
          {!videoId && (
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-t3-off-white/40 to-transparent pointer-events-none" />
          )}
        </motion.div>
        <Link
          to={`/work/${workstory.slug}`}
          className="block"
        >
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-heading tracking-tight group-hover:text-t3-muted-gray transition-colors">
              {workstory.title}
            </h3>
            <p className="text-t3-muted-gray leading-relaxed">
              {workstory.summary}
            </p>
            {workstory.outcome && (
              <p className="text-sm text-t3-accent-gold">
                → {workstory.outcome}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {workstory.domains.slice(0, 3).map(domain => (
                <Tag key={domain}>{domain}</Tag>
              ))}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Link
      to={`/work/${workstory.slug}`}
      className="group block py-6 md:py-8 border-b border-t3-soft-divider hover:bg-t3-soft-wash/50 transition-colors -mx-6 px-6 md:-mx-12 md:px-12"
    >
      <div className="grid md:grid-cols-12 gap-4 md:gap-8">
        <div className="md:col-span-7">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading tracking-tight mb-2 md:mb-3 group-hover:text-t3-muted-gray transition-colors">
            {workstory.title}
          </h3>
          <p className="text-sm md:text-base text-t3-muted-gray leading-relaxed mb-4">
            {workstory.summary}
          </p>
          {workstory.outcome && (
            <p className="text-xs md:text-sm text-t3-accent-gold opacity-0 group-hover:opacity-100 transition-opacity">
              Result: {workstory.outcome}
            </p>
          )}
        </div>
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {workstory.domains.map(domain => (
              <Tag key={domain}>{domain}</Tag>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm text-t3-muted-gray">
            <span>{workstory.location}</span>
            <ArrowUpRight className="opacity-50 group-hover:opacity-100 transition-opacity" size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}