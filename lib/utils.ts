/** Serialize a Mongoose lean doc for client component props. */
export function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

/** Shared CaseStudy type used across components. */
export type CaseStudyDoc = {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year?: number;
  domains?: string[];
  industries?: string[];
  locations?: string[];
  heroImage?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
  sections?: { heading: string; body: string; media?: string[] }[];
  outcomes?: string[];
  createdAt?: string;
  updatedAt?: string;
};

/** Challenge categories for the recommender. */
export const CHALLENGE_CATEGORIES = [
  { key: "brand", label: "Brand Building", domain: "Brand Building" },
  { key: "pr", label: "PR & Media", domain: "PR & Media Strategy" },
  { key: "social", label: "Social Media", domain: "Social Media Management" },
  { key: "innovation", label: "Business Innovation", domain: "Business Innovations" },
  { key: "design", label: "Art & Design", domain: "Art & Design" },
  { key: "tech", label: "AI & Tech", domain: "AI & Tech Solutions" },
] as const;

/** Services list for the services page and homepage. */
export const SERVICES = [
  {
    title: "Brand Building",
    tagline: "Crafting compelling brand identities that resonate.",
    desc: "We create identities that stand out, delivering cohesive brand strategies that reflect your vision and values. From naming and messaging to visual identity and positioning — we handle it all.",
    icon: "layers",
  },
  {
    title: "Business Innovations",
    tagline: "Navigating the toughest challenges with fresh solutions.",
    desc: "We ignite transformation with forward-thinking solutions that help businesses thrive. From streamlining operations to identifying new revenue streams, innovation is the core of your growth.",
    icon: "lightbulb",
  },
  {
    title: "PR & Media Strategy",
    tagline: "Shaping narratives that elevate your brand.",
    desc: "Earned media campaigns, crisis management, and media relations that shape public narrative. We craft stories that resonate with your audience and amplify your market presence.",
    icon: "megaphone",
  },
  {
    title: "Social Media Management",
    tagline: "Engaging content, amplified reach.",
    desc: "We blend creativity with data-driven insights to reach the right audience at the right time. Our 360-degree marketing solutions ensure your brand stays top-of-mind across all platforms.",
    icon: "share2",
  },
  {
    title: "Art & Design",
    tagline: "Turning visions into reality with cutting-edge creativity.",
    desc: "Our design philosophy blends creativity with purpose. Whether it's web design, store interiors, or digital media, every detail is crafted with precision to reflect your brand's essence.",
    icon: "palette",
  },
  {
    title: "AI & Tech Solutions",
    tagline: "Empowering businesses with the future of technology.",
    desc: "We harness cutting-edge technology to optimize business operations and deliver seamless customer experiences. From AI-powered tools to process automation and system integration.",
    icon: "cpu",
  },
] as const;

/** Stats for social proof. */
export const STATS = [
  { value: "20+", label: "Years of Experience" },
  { value: "300+", label: "Projects Delivered" },
  { value: "75+", label: "Happy Clients" },
  { value: "95%", label: "Client Retention" },
] as const;
