import { Search } from 'lucide-react';
import { useState } from 'react';

interface FiltersBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  domain: string;
  industry: string;
  featured: boolean;
  sort: string;
}

const DOMAINS = [
  'Brand Building',
  'Business Innovations',
  'Marketing',
  'PR & Media Strategy',
  'Social Media',
  'Art & Design',
  'AI & Tech Solutions'
];

const INDUSTRIES = [
  'Hospitality',
  'Real Estate',
  'Events',
  'Political Communication',
  'FMCG',
  'Manufacturing',
  'Retail'
];

export function FiltersBar({ onFilterChange }: FiltersBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    domain: '',
    industry: '',
    featured: false,
    sort: 'recent'
  });

  const handleChange = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-t3-soft-wash border border-t3-soft-divider rounded-lg p-4 md:p-6">
      <div className="grid md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="md:col-span-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-t3-muted-gray" size={18} />
            <input
              type="text"
              placeholder="Search workstories..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-t3-off-white border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold"
            />
          </div>
        </div>

        {/* Domain Filter */}
        <div className="md:col-span-3">
          <select
            value={filters.domain}
            onChange={(e) => handleChange('domain', e.target.value)}
            className="w-full px-4 py-2.5 bg-t3-off-white border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold appearance-none cursor-pointer"
          >
            <option value="">All Domains</option>
            {DOMAINS.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div className="md:col-span-3">
          <select
            value={filters.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full px-4 py-2.5 bg-t3-off-white border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold appearance-none cursor-pointer"
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Featured Toggle & Sort */}
        <div className="md:col-span-2 flex gap-2">
          <button
            onClick={() => handleChange('featured', !filters.featured)}
            className={`flex-1 px-4 py-2.5 rounded-lg border transition-colors ${
              filters.featured
                ? 'bg-t3-accent-gold border-t3-accent-gold text-t3-off-white'
                : 'bg-t3-off-white border-t3-soft-divider text-t3-muted-gray hover:border-t3-accent-gold'
            }`}
          >
            Featured
          </button>
        </div>
      </div>
    </div>
  );
}
