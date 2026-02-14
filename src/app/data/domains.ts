export interface Domain {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}

export const domains: Domain[] = [
  {
    id: 'business-innovations',
    title: 'Business Innovations',
    description: 'Fresh solutions for tough challenges.',
    longDescription: 'We help organizations break through complexity with innovative business models, process reimagination, and strategic interventions that create lasting competitive advantage.'
  },
  {
    id: 'brand-building',
    title: 'Brand Building',
    description: 'Crafting compelling brand identities that resonate.',
    longDescription: 'From positioning to visual identity to brand experience, we build brands that don\'t just look different—they think different. Our approach creates emotional connections that drive loyalty and advocacy.'
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Campaigns that move markets and minds.',
    longDescription: 'Strategic marketing that cuts through noise. We combine data-driven insights with creative storytelling to build campaigns that generate real business impact across channels.'
  },
  {
    id: 'design',
    title: 'Art & Design',
    description: 'Turning visions into reality.',
    longDescription: 'Design is our language for solving problems beautifully. From experiences to interfaces to spatial design, we create work that\'s as functional as it is inspiring.'
  },
  {
    id: 'tech-solutions',
    title: 'AI & Tech Solutions',
    description: 'Empowering businesses with the future of technology.',
    longDescription: 'We deploy technology as a catalyst for transformation—from AI integration to automation to digital platforms. Our solutions enhance human capabilities rather than replace them.'
  },
  {
    id: 'pr-media',
    title: 'PR & Media Strategy',
    description: 'Shaping narratives that elevate your brand.',
    longDescription: 'Strategic communications that build reputation and influence. We craft stories that resonate with audiences and earn attention in the moments that matter most.'
  }
];

export const getDomainById = (id: string) => domains.find(d => d.id === id);
