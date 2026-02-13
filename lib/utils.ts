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
    desc: "Identity systems, positioning, and brand architecture that create lasting market differentiation.",
    icon: "layers",
  },
  {
    title: "Business Innovations",
    desc: "Strategic consulting that turns complex market challenges into scalable, profitable solutions.",
    icon: "lightbulb",
  },
  {
    title: "PR & Media Strategy",
    desc: "Earned media campaigns, crisis management, and media relations that shape public narrative.",
    icon: "megaphone",
  },
  {
    title: "Social Media Management",
    desc: "Community-driven strategies across platforms — content, engagement, and growth loops.",
    icon: "share2",
  },
  {
    title: "Art & Design",
    desc: "Visual systems, experiential design, and creative direction for campaigns that resonate.",
    icon: "palette",
  },
  {
    title: "AI & Tech Solutions",
    desc: "Intelligent automation, data-driven marketing tools, and technology integrations.",
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
