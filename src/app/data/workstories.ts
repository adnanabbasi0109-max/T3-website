export interface Workstory {
  slug: string;
  title: string;
  summary: string;
  year: string;
  location: string;
  featured: boolean;
  domains: string[];
  industries: string[];
  services: string[];
  challenge?: string;
  intervention?: string;
  execution?: string[];
  outcome?: string;
  proofPoints?: string[];
  videoUrl?: string;
  image?: string;
}

export const workstories: Workstory[] = [
  {
    slug: 'share-a-coke',
    title: 'Share a Coke Campaign',
    summary: 'We brought the iconic "Share a Coke" campaign to life by merging OOH and Digital Media in a way that connected people like never before.',
    year: '2015',
    location: 'India',
    featured: true,
    domains: ['PR & Media Strategy', 'Social Media', 'Business Innovations'],
    industries: ['FMCG', 'Beverages'],
    services: ['Campaign Strategy', 'Experiential Marketing', 'OOH', 'Digital Media', 'Content Creation'],
    challenge: 'Create a breakthrough campaign that makes Coca-Cola personally relevant and sparks social sharing moments.',
    intervention: 'A massive Coca-Cola bottle with LED screens displayed the names of loved ones, inviting consumers to share a Coke. This larger-than-life installation sparked personal connections and went viral, generating massive buzz across social media.',
    execution: [
      'Merged OOH and Digital Media for maximum impact',
      'Built massive Coca-Cola bottle installation with LED screens displaying names',
      'Created personalized sharing experience inviting consumers to share a Coke',
      'Developed social media campaign encouraging people to share bottles with friends',
      'Integrated traditional media with digital activation for maximum reach'
    ],
    outcome: 'Campaign became a cultural phenomenon, driving sales growth and massive social engagement.',
    proofPoints: [
      'Went viral generating massive buzz across social media',
      'Over 5 million social media mentions and shares',
      '76 million impressions across platforms',
      'Featured in major national and international media',
      'Won multiple advertising and marketing awards'
    ],
    image: ''
  },
  {
    slug: 'giovanni-village',
    title: 'Giovanni Village Luxury Resort',
    summary: 'From concept to reality, we shaped the Giovanni Village brand, a luxury resort in Bhopal. Our involvement spanned every detail\u2014logo design, site signage, and guest experience aesthetics, all crafted to exude elegance.',
    year: '2023',
    location: 'Bhopal',
    featured: true,
    domains: ['Brand Building', 'Art & Design', 'Social Media'],
    industries: ['Hospitality'],
    services: ['Brand Identity', 'Experience Design', 'Web Development', 'Social Media Marketing', 'Process Automation'],
    challenge: 'Launch a new luxury resort in a competitive hospitality market with no existing brand equity or recognition.',
    intervention: 'We designed a seamless website, amplified the brand through social media marketing, and streamlined operations with process automation. Giovanni Village became a benchmark for luxury hospitality, thanks to a cohesive brand identity and a memorable guest experience.',
    execution: [
      'Crafted complete brand identity including logo design and visual language',
      'Designed site signage and guest experience aesthetics to exude elegance',
      'Built seamless website with immersive photography and booking integration',
      'Amplified brand through social media marketing',
      'Streamlined operations with process automation'
    ],
    outcome: 'Giovanni Village became a benchmark for luxury hospitality, thanks to a cohesive brand identity and a memorable guest experience.',
    proofPoints: [
      'Established premium brand presence before property opening',
      'Generated significant pre-launch interest and bookings',
      'Created scalable brand system for future expansion'
    ],
    videoUrl: 'https://example.com/giovanni',
    image: ''
  },
  {
    slug: 'desert-springs',
    title: 'Desert Springs Resort \u2014 Jashn in Jaisalmer',
    summary: 'We built the Desert Springs Resort brand in the heart of Jaisalmer\'s deserts with the theme \'Jashn in Jaisalmer,\' celebrating the rich cultural and traditional beauty of Rajasthan.',
    year: '2022',
    location: 'Jaisalmer',
    featured: true,
    domains: ['Brand Building', 'Marketing'],
    industries: ['Hospitality'],
    services: ['Campaign Strategy', 'Brand Development', 'Event Curation', 'Integrated Campaigns', 'Content Creation'],
    challenge: 'Launch a new resort in Jaisalmer\'s competitive desert tourism landscape with differentiated positioning.',
    intervention: 'From event curation to integrated campaigns, we showcased the essence of Rajasthani heritage in every touchpoint of communication. This blend of luxury and authenticity positioned Desert Springs Resort as a premier destination for those seeking an immersive and culturally rich experience in the Thar Desert.',
    execution: [
      'Developed \'Jashn in Jaisalmer\' campaign theme celebrating cultural heritage',
      'Curated events showcasing Rajasthani traditions and heritage',
      'Created integrated campaigns across all touchpoints',
      'Designed visual identity celebrating Rajasthani heritage with contemporary luxury'
    ],
    outcome: 'Positioned Desert Springs Resort as a premier destination for those seeking an immersive and culturally rich experience in the Thar Desert.',
    proofPoints: [
      'Strong launch momentum with bookings',
      'Media coverage in hospitality publications',
      'Differentiated positioning in crowded market'
    ],
    image: ''
  },
  {
    slug: 'friends-of-bhopal',
    title: 'Friends of Bhopal Property Fair',
    summary: 'For CREDAI Bhopal, we crafted an immersive property fair themed \'Friends of Bhopal,\' spotlighting innovation with a grand selfie station and a surprise public painting.',
    year: '2023',
    location: 'Bhopal',
    featured: true,
    domains: ['Business Innovations', 'Art & Design'],
    industries: ['Events', 'Real Estate'],
    services: ['Experience Design', 'Event Strategy', 'Immersive Technology', 'Community Engagement'],
    challenge: 'Differentiate a property fair in a market saturated with conventional real estate exhibitions.',
    intervention: 'The event spotlighted innovation with a grand selfie station, while a surprise public painting slowly revealed a stunning portrait of Bhopal, created by its own citizens. A captivating photo gallery shared the rich history and development of Bhopal, engaging visitors with intriguing facts.',
    execution: [
      'Created grand selfie station as innovation highlight',
      'Organized surprise public painting revealing portrait of Bhopal by citizens',
      'Built captivating photo gallery of Bhopal\'s rich history and development',
      'Engaged visitors with intriguing facts about the city',
      'Developed unified visual language across event touchpoints'
    ],
    outcome: 'This unique blend of creativity and community spirit made the event an unforgettable experience for all.',
    proofPoints: [
      'Unprecedented visitor engagement',
      'Higher quality lead generation',
      'Set new standard for property exhibitions in region'
    ],
    image: ''
  },
  {
    slug: 'twitter-apac',
    title: 'Creative Consulting for Twitter Asia Pacific',
    summary: 'We partnered with Twitter Asia Pacific\'s Business Team, offering creative consulting and crafting winning strategies that drove high-value ad campaigns on the platform.',
    year: '2021',
    location: 'Asia Pacific',
    featured: true,
    domains: ['Business Innovations', 'Brand Building'],
    industries: ['Technology', 'Social Media'],
    services: ['Creative Consulting', 'Pitch Presentations', 'Campaign Strategy', 'Ad Campaign Design'],
    challenge: 'Help Twitter\'s business team secure big-ticket ad deals from global brands by empowering them with impactful creative solutions.',
    intervention: 'Our pitch presentations were taken to global brands, driving high-value ad campaigns on the platform. Our role was instrumental in helping Twitter secure big-ticket ad deals by empowering their business team with impactful solutions.',
    execution: [
      'Partnered with Twitter Asia Pacific\'s Business Team',
      'Offered creative consulting and crafted winning strategies',
      'Created pitch presentations for global brands',
      'Drove high-value ad campaigns on the platform'
    ],
    outcome: 'Instrumental in helping Twitter secure big-ticket ad deals by empowering their business team with impactful solutions.',
    proofPoints: [
      'Secured high-value ad deals from global brands',
      'Strengthened Twitter\'s business team capabilities',
      'Created winning pitch presentations for major accounts'
    ],
    image: ''
  },
  {
    slug: 'pepsico-katrina',
    title: 'PepsiCo Conference \u2014 Holographic Katrina Kaif',
    summary: 'In Pattaya, Thailand, we brought PepsiCo\'s vision to life with a stunning holographic projection of Katrina Kaif, the brand ambassador for Slice.',
    year: '2022',
    location: 'Pattaya, Thailand',
    featured: true,
    domains: ['Business Innovations', 'AI & Tech Solutions'],
    industries: ['Events', 'FMCG'],
    services: ['Experience Innovation', 'Holographic Projection', 'Event Production', 'OOH Campaign'],
    challenge: 'Create a memorable highlight for PepsiCo\'s conference that would engage attendees and generate buzz.',
    intervention: 'The near-real hologram had Katrina addressing the audience at the PepsiCo conference, creating an unforgettable experience. Our team flew in from Bhopal, executing the event with precision and finesse. The conference was followed by an outdoor campaign on the same theme, which we ideated to enhance brand visibility.',
    execution: [
      'Created stunning holographic projection of Katrina Kaif',
      'Flew team from Bhopal to execute with precision and finesse',
      'Designed stage setup for optimal holographic effect',
      'Managed technical execution and live event flow',
      'Ideated outdoor campaign on same theme to enhance brand visibility'
    ],
    outcome: 'Created viral moment that elevated the conference experience, followed by a successful outdoor campaign.',
    proofPoints: [
      'Unprecedented engagement during session',
      'Significant social media amplification',
      'Set new benchmark for corporate event innovation'
    ],
    image: ''
  },
  {
    slug: 'kamaal-ka-bhopal',
    title: 'Kamaal Ka Bhopal \u2014 Global Investor Summit 2025',
    summary: 'We put Bhopal in the spotlight with the Kamaal Ka Bhopal campaign at the Global Investor Summit 2025, sparking unprecedented engagement.',
    year: '2025',
    location: 'Bhopal',
    featured: true,
    domains: ['Brand Building', 'PR & Media Strategy', 'Social Media'],
    industries: ['Political Communication', 'Events'],
    services: ['OOH Campaign', 'Documentary Production', 'Photo Booth', 'Social Media Outreach', 'Media Relations'],
    challenge: 'Showcase Bhopal as a rising investment and cultural hub at the Global Investor Summit 2025.',
    intervention: 'Through a powerful mix of an eye-catching OOH campaign, an immersive grand photo booth, a compelling documentary on Bhopal\'s growth story, and a high-impact social media outreach, we captured hearts and attention alike.',
    execution: [
      'Created eye-catching OOH campaign across the city',
      'Built immersive grand photo booth at the summit',
      'Produced compelling documentary on Bhopal\'s growth story',
      'Launched high-impact social media outreach',
      'Secured extensive coverage by premier media channels'
    ],
    outcome: 'The campaign sparked unprecedented engagement and was extensively covered by premier media channels, solidifying Bhopal\'s position as a rising investment and cultural hub.',
    proofPoints: [
      'Unprecedented social media engagement',
      'Extensively covered by premier media channels',
      'Strong community participation and ownership',
      'Solidified Bhopal\'s position as rising investment hub'
    ],
    image: ''
  },
  {
    slug: 'ajinkya-rahane-platina',
    title: 'The Ajinkya Rahane Factor at Platina',
    summary: 'We elevated the Anukampa Platina Terraces brand by bringing Indian cricketer Ajinkya Rahane on board as the brand ambassador.',
    year: '2022',
    location: 'Jaipur',
    featured: false,
    domains: ['Brand Building', 'Marketing'],
    industries: ['Real Estate'],
    services: ['Celebrity Endorsement', '360 Campaign', 'Documentary Production', 'Brand Development'],
    challenge: 'Elevate a premium residential project and create deep connection with current and potential buyers.',
    intervention: 'The 360-degree campaign included a compelling project documentary featuring buyers, architects, and stakeholders, each sharing their experiences and insights. This multifaceted approach highlighted the project\'s appeal and created a deep connection with both current and potential buyers.',
    execution: [
      'Brought Indian cricketer Ajinkya Rahane on board as brand ambassador',
      'Produced compelling project documentary featuring buyers, architects, and stakeholders',
      'Created 360-degree campaign across all touchpoints',
      'Highlighted project appeal through stakeholder testimonials'
    ],
    outcome: 'Established Anukampa Platina Terraces as a premium residential destination.',
    proofPoints: [
      'Strong brand recall with celebrity endorsement',
      'Deep connection with current and potential buyers',
      'Premium positioning in residential market'
    ],
    image: ''
  },
  {
    slug: 'pinkwalk',
    title: 'PinkWalk \u2014 Rajasthan\'s Largest Mall',
    summary: 'From the very start, we shaped PinkWalk, Rajasthan\'s largest mall, spanning 11 lakh square feet. Our journey began with brand naming and identity creation.',
    year: '2023',
    location: 'Jaipur',
    featured: true,
    domains: ['Brand Building', 'Marketing', 'Social Media'],
    industries: ['Real Estate', 'Retail'],
    services: ['Brand Naming', 'Brand Identity', 'Marketing Strategy', 'Social Media Management', 'Content Creation'],
    challenge: 'Build a brand from scratch for Rajasthan\'s largest mall and establish it as the go-to destination for retail and entertainment.',
    intervention: 'Our journey began with brand naming and identity creation, followed by a strategic marketing campaign aimed at the right target audience. The result? PinkWalk became Jaipur\'s biggest buzzword, with India\'s most premier brands already onboarded.',
    execution: [
      'Created brand name and complete identity from scratch',
      'Developed strategic marketing campaign targeting right audience',
      'Onboarded India\'s most premier brands',
      'Built social media presence with focus on lifestyle and community',
      'Designed experiential activations and mall events'
    ],
    outcome: 'PinkWalk became Jaipur\'s biggest buzzword, setting it up as the go-to destination for retail and entertainment in the region.',
    proofPoints: [
      'India\'s most premier brands onboarded',
      'Became Jaipur\'s biggest buzzword',
      'Go-to destination for retail and entertainment in the region'
    ],
    image: '/images/workstories/pinkwalk.jpg'
  },
  {
    slug: '14-woodland-park',
    title: '14 Woodland Park \u2014 High-End Residential Project',
    summary: 'For Manglam Group\'s 14 Woodland Park, we executed a comprehensive 360-degree campaign, from brand identity to full-scale marketing.',
    year: '2022',
    location: 'Jaipur',
    featured: false,
    domains: ['Brand Building', 'Marketing'],
    industries: ['Real Estate'],
    services: ['360 Campaign', 'Brand Identity', 'Marketing Strategy', 'Sales Enablement', 'Strategic Communication'],
    challenge: 'Elevate a prestigious residential project at Shiprapath, Jaipur, through strategic communication that resonated with premium buyers.',
    intervention: 'This prestigious residential project at Shiprapath, Jaipur, was elevated through strategic communication that resonated with premium buyers.',
    execution: [
      'Created comprehensive brand identity for the project',
      'Executed full-scale marketing campaign',
      'Developed strategic communication targeting premium buyers',
      'Created virtual tours and visualization tools'
    ],
    outcome: 'Today, 14 Woodland Park is nearly sold out, marking it as one of the most successful high-end residential projects in Jaipur.',
    proofPoints: [
      'Nearly sold out',
      'One of the most successful high-end projects in Jaipur',
      'Strong buyer interest from premium segment'
    ],
    image: '/images/workstories/14-woodland-park.jpg'
  },
  {
    slug: 'manglam-aananda',
    title: 'Manglam Aananda \u2014 Mid-Segment Township',
    summary: 'For Manglam Aananda, a 1,500-unit township, we crafted a holistic campaign that connected with mid-segment buyers.',
    year: '2023',
    location: 'Jaipur',
    featured: false,
    domains: ['Brand Building', 'Marketing', 'Art & Design'],
    industries: ['Real Estate'],
    services: ['Documentary Production', 'Campaign Strategy', 'Content Marketing', 'Brand Storytelling'],
    challenge: 'Drive interest and sales for a 1,500-unit mid-segment township in Jaipur.',
    intervention: 'Our high-impact project documentary showcased the lifestyle and value offered by the township, driving immense interest.',
    execution: [
      'Crafted holistic campaign connecting with mid-segment buyers',
      'Produced high-impact project documentary showcasing lifestyle and value',
      'Developed lifestyle-focused brand narrative',
      'Created integrated campaign across channels'
    ],
    outcome: 'The project is now completely sold out, solidifying Manglam Aananda as one of Jaipur\'s most sought-after residential addresses.',
    proofPoints: [
      'Project completely sold out',
      'One of Jaipur\'s most sought-after residential addresses',
      'Documentary content generated significant engagement'
    ],
    image: ''
  },
  {
    slug: 'future-city',
    title: 'The Future City \u2014 100+ Acre Township in Jaipur',
    summary: 'For The Future City by Trimurty Builders, we developed a robust brand and marketing strategy for this expansive 100+ acre residential township.',
    year: '2023',
    location: 'Jaipur',
    featured: false,
    domains: ['Brand Building', 'Marketing'],
    industries: ['Real Estate'],
    services: ['Brand Strategy', 'Marketing Strategy', 'Documentary Production', 'Communication Strategy'],
    challenge: 'Engage mid-level real estate investors for a 100+ acre residential township in Jaipur.',
    intervention: 'The campaign included a captivating project documentary and a targeted communication strategy designed to engage mid-level real estate investors. By focusing on future growth and community living, we positioned The Future City as an ideal investment opportunity.',
    execution: [
      'Developed robust brand and marketing strategy',
      'Produced captivating project documentary',
      'Created targeted communication strategy for mid-level investors',
      'Focused messaging on future growth and community living'
    ],
    outcome: 'Positioned The Future City as an ideal investment opportunity, driving strong interest from investors looking for long-term value in Jaipur.',
    proofPoints: [
      'Strong interest from mid-level investors',
      'Positioned as ideal long-term investment opportunity',
      'Effective documentary driving engagement'
    ],
    image: ''
  },
  {
    slug: 'rg-live',
    title: 'RG Live \u2014 Virtual Speech Setup for Rahul Gandhi',
    summary: 'We pioneered a new approach in political communication with "RG Live," a virtual speech setup projected on LED screens mounted on mobile vans.',
    year: '2021',
    location: 'India',
    featured: false,
    domains: ['Business Innovations', 'AI & Tech Solutions'],
    industries: ['Political Communication'],
    services: ['Virtual Speech Setup', 'LED Display', 'Mobile Campaign', 'Visual Production'],
    challenge: 'Extend the reach of political communication beyond traditional rallies and physical events.',
    intervention: 'A pre-recorded speech was projected on LED screens mounted on mobile vans, enhanced with supporting visuals to amplify the message\'s impact. The mobile vans extended the reach, and multiple screenings boosted the recall value.',
    execution: [
      'Created virtual speech setup with pre-recorded content',
      'Deployed LED screens mounted on mobile vans',
      'Enhanced speeches with supporting visuals for impact',
      'Scheduled multiple screenings to boost recall value'
    ],
    outcome: 'Made it a powerful tool for engaging the masses, extending reach beyond traditional rally formats.',
    proofPoints: [
      'Extended reach beyond traditional rally format',
      'Multiple screenings boosted recall value',
      'Pioneered new approach in political communication'
    ],
    image: ''
  },
  {
    slug: 'scindia-live',
    title: 'Scindia Live \u2014 Virtual Speech Setup for JM Scindia',
    summary: 'With "Scindia Live," we brought a fresh dynamic to political communication for JM Scindia using mobile vans with LED screens.',
    year: '2021',
    location: 'India',
    featured: false,
    domains: ['Business Innovations', 'AI & Tech Solutions'],
    industries: ['Political Communication'],
    services: ['Virtual Speech Setup', 'LED Display', 'Mobile Campaign', 'Visual Production'],
    challenge: 'Extend political reach across regions with impactful communication that ensures top-of-mind recall.',
    intervention: 'A pre-recorded speech was displayed on mobile vans equipped with LED screens, supported by impactful visuals to enhance the message. The mobile vans boosted reach across regions, while multiple screenings ensured the speech remained top-of-mind for the audience.',
    execution: [
      'Displayed pre-recorded speech on mobile van LED screens',
      'Created supporting impactful visuals',
      'Deployed mobile vans across regions to boost reach',
      'Scheduled multiple screenings for reinforced recall'
    ],
    outcome: 'Reinforced influence and recall, making political communication more accessible and impactful across regions.',
    proofPoints: [
      'Boosted reach across regions',
      'Multiple screenings ensured top-of-mind recall',
      'Effective new political communication format'
    ],
    image: ''
  },
  {
    slug: 'ubf',
    title: 'United By Food (UBF) \u2014 Fast Food Brand',
    summary: 'We conceived and delivered United By Food (UBF), a fast-food brand that quickly rose to popularity in India.',
    year: '2022',
    location: 'India',
    featured: false,
    domains: ['Brand Building', 'Business Innovations'],
    industries: ['Food & Beverage', 'Retail'],
    services: ['Brand Naming', 'Brand Building', 'Marketing', 'Store Design', 'Systems & Process Design'],
    challenge: 'Create a fast-food brand from scratch that can compete and stand out in India\'s crowded food industry.',
    intervention: 'Our end-to-end role covered everything from naming and brand building to marketing, store design, and systems and process design. UBF became a standout in the fast-food industry.',
    execution: [
      'Conceived brand name and concept from scratch',
      'Built complete brand identity and positioning',
      'Developed marketing strategy and campaigns',
      'Designed store interiors and customer experience',
      'Created systems and process design for operations'
    ],
    outcome: 'UBF became a standout in the fast-food industry, recognized as one of the most popular brands in the country.',
    proofPoints: [
      'Quickly rose to popularity in India',
      'Recognized as one of the most popular brands in segment',
      'Complete end-to-end brand creation success'
    ],
    image: ''
  },
  {
    slug: 'polywood-rebrand',
    title: 'Polywood Rebranding \u2014 From Perception to Protection',
    summary: 'We took on the challenge of rebranding Polywood, transforming its image from a non-nature-friendly brand to one focused on protecting nature and trees.',
    year: '2023',
    location: 'India',
    featured: true,
    domains: ['Brand Building', 'Business Innovations'],
    industries: ['Manufacturing'],
    services: ['Brand Repositioning', 'Identity Design', 'Documentary Production', 'Brand Experience', 'Perception Management'],
    challenge: 'Transform perception of Polywood, a PVC and UPVC panel manufacturer, from a non-nature-friendly brand to one focused on protecting nature.',
    intervention: 'Through a captivating brand documentary and innovative brand experiences, we reshaped public perception. Today, Polywood stands as one of the most popular brands in its segment across India.',
    execution: [
      'Created captivating brand documentary',
      'Developed innovative brand experiences',
      'Redesigned brand identity with nature-protection positioning',
      'Implemented perception shift campaign',
      'Reshaped public perception from commodity to eco-conscious brand'
    ],
    outcome: 'Today, Polywood stands as one of the most popular brands in its segment across India.',
    proofPoints: [
      'Successful perception shift from non-nature-friendly to nature-protecting',
      'One of the most popular brands in segment across India',
      'Stronger pricing power and brand equity',
      'Differentiated positioning in competitive market'
    ],
    image: ''
  }
];

export const getFeaturedWorkstories = () => workstories.filter(w => w.featured);

export const getWorkstoryBySlug = (slug: string) => workstories.find(w => w.slug === slug);

export const filterWorkstories = (filters: {
  search?: string;
  domain?: string;
  industry?: string;
  featured?: boolean;
}) => {
  return workstories.filter(story => {
    if (filters.search && !story.title.toLowerCase().includes(filters.search.toLowerCase()) &&
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
};
