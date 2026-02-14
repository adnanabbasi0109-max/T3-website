import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });

import mongoose from "mongoose";

const MONGODB_URI = (process.env.MONGODB_URI || "").trim();
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI. Add it to .env.local");
}

const CaseStudySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    client: String,
    year: Number,
    domains: [String],
    industries: [String],
    locations: [String],
    heroImage: String,
    gallery: [String],
    featured: Boolean,
    order: Number,
    sections: [{ heading: String, body: String, media: [String] }],
    outcomes: [String],
  },
  { timestamps: true }
);

const CaseStudy =
  mongoose.models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);

const data = [
  {
    slug: "share-a-coke",
    title: "Share a Coke Campaign",
    client: "Coca-Cola",
    year: 2015,
    domains: ["Brand Building", "Social Media Management"],
    industries: ["FMCG", "Beverages"],
    locations: ["Delhi NCR"],
    featured: true,
    order: 1,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Localize Coca-Cola's global 'Share a Coke' campaign for the Indian market with cultural nuance, regional relevance, and maximum social amplification.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "India doesn't share the way the West does. Sharing here is familial, emotional, deeply tied to festivals and daily rituals. The personalization angle needed to go beyond first names — into relationships, local slang, and moments.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Regional name packs, festival-themed limited editions, a UGC-driven social campaign encouraging photo sharing, and on-ground activation at key retail and event touchpoints across North India.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Significant uplift in social mentions, strong regional engagement, and measurable sales impact in activation markets. The campaign became a template for future regional rollouts.",
        media: [],
      },
    ],
    outcomes: [
      "3x social engagement in North India",
      "Regional cultural relevance achieved",
      "Template for future localized campaigns",
    ],
  },
  {
    slug: "giovanni-village",
    title: "Giovanni Village Luxury Resort",
    client: "Giovanni",
    year: 2019,
    domains: ["Brand Building", "Art & Design"],
    industries: ["Hospitality"],
    locations: ["Bhopal"],
    featured: true,
    order: 2,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Build a luxury hospitality brand from inception — identity, experience, and communication that feels coherent at every touchpoint.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "In Central India's emerging luxury hospitality market, guests don't just book a room — they buy into a narrative. The brand needed to tell a story of heritage meeting modern luxury.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Complete brand identity system, on-ground guest experience design, environmental graphics and signage, website, social media presence, and launch communication strategy.",
        media: [],
      },
      {
        heading: "The Result",
        body: "A cohesive premium brand with a consistent experience narrative — online and offline — built to scale into future sub-brands and properties.",
        media: [],
      },
    ],
    outcomes: [
      "Cohesive luxury brand system",
      "Premium market positioning in Central India",
      "Consistent guest experience across touchpoints",
    ],
  },
  {
    slug: "desert-springs-jashn",
    title: "Desert Springs Resort – Jashn in Jaisalmer",
    client: "Desert Springs",
    year: 2022,
    domains: ["Brand Building", "PR & Media Strategy", "Art & Design"],
    industries: ["Hospitality", "Events"],
    locations: ["Jaipur"],
    featured: true,
    order: 3,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Launch 'Jashn in Jaisalmer' as a signature cultural celebration tied to Desert Springs Resort — blending Rajasthani heritage with luxury hospitality to create a destination event.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Luxury travelers don't just want comfort; they want stories. A festival-format event at a desert resort creates a narrative that markets itself — guests become ambassadors.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Event concept and naming, experiential design for a multi-day cultural celebration, artist curation, PR outreach to travel and lifestyle media, and a social campaign with a cinematic content strategy.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Jashn became the resort's signature annual event, driving direct bookings, national press coverage, and a social footprint that extended the brand far beyond Rajasthan.",
        media: [],
      },
    ],
    outcomes: [
      "Signature annual event established",
      "National press coverage in lifestyle media",
      "Direct booking surge during event windows",
    ],
  },
  {
    slug: "credai-bhopal-property-fair",
    title: "Friends of Bhopal Property Fair",
    client: "CREDAI Bhopal",
    year: 2017,
    domains: ["PR & Media Strategy", "Business Innovations"],
    industries: ["Real Estate"],
    locations: ["Bhopal"],
    featured: true,
    order: 4,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Conceptualize and execute Bhopal's largest property expo under CREDAI's banner — driving footfall, builder participation, and buyer confidence in a cautious market.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Property fairs often feel transactional. The opportunity was to reframe the event as a community celebration — 'Friends of Bhopal' — creating civic pride alongside purchase intent.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Event branding and communication, media relations across print, TV, and digital, celebrity anchoring, buyer engagement mechanics, and a loyalty program for repeat visitors.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Record footfall, high builder satisfaction, significant press coverage, and the event established itself as an annual fixture in the Central Indian real estate calendar.",
        media: [],
      },
    ],
    outcomes: [
      "Record footfall for a Bhopal property event",
      "Multi-year event franchise established",
      "Strong builder-to-buyer conversion metrics",
    ],
  },
  {
    slug: "twitter-apac-consulting",
    title: "Creative Consulting for Twitter Asia Pacific",
    client: "Twitter APAC",
    year: 2016,
    domains: ["Brand Building", "AI & Tech Solutions", "Social Media Management"],
    industries: ["Technology", "Social Media"],
    locations: ["Delhi NCR"],
    featured: true,
    order: 5,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Advise Twitter's Asia Pacific team on creative strategy for brand advertiser engagement — helping major brands use Twitter's ad products more effectively and creatively.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Most brands treated Twitter as a broadcast channel. The platform's true power was in real-time conversation. Creative strategy needed to shift from 'publish' to 'participate.'",
        media: [],
      },
      {
        heading: "The Build",
        body: "Creative playbooks for key verticals, case study development showcasing successful campaigns, workshop facilitation for brand teams, and a framework for real-time content creation.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Increased ad revenue from creative-led pitches, a reusable playbook adopted across APAC markets, and measurably higher engagement rates on campaigns using the new approach.",
        media: [],
      },
    ],
    outcomes: [
      "Creative playbook adopted across APAC",
      "Higher brand engagement rates",
      "Improved ad product perception among advertisers",
    ],
  },
  {
    slug: "pepsico-holographic",
    title: "PepsiCo Conference – Holographic Projection",
    client: "PepsiCo",
    year: 2018,
    domains: ["AI & Tech Solutions", "Art & Design"],
    industries: ["FMCG", "Events"],
    locations: ["Delhi NCR"],
    featured: true,
    order: 6,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Create a show-stopping keynote experience for PepsiCo's annual conference using holographic projection technology — making the leadership address feel futuristic and memorable.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Corporate conferences suffer from attention fatigue. A holographic projection disrupts the format enough to re-engage an audience accustomed to slide decks and talking heads.",
        media: [],
      },
      {
        heading: "The Build",
        body: "End-to-end holographic production: content scripting, 3D animation, holographic screen and projection setup, rehearsal management, and seamless integration with the live stage program.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Standing ovation from 500+ attendees. The holographic keynote became the most discussed moment of the conference and set a new benchmark for PepsiCo's internal events.",
        media: [],
      },
    ],
    outcomes: [
      "Standing ovation from 500+ attendees",
      "New benchmark for corporate events",
      "Viral internal sharing across PepsiCo offices",
    ],
  },
  {
    slug: "kamaal-ka-bhopal",
    title: "Kamaal Ka Bhopal – Global Investor Summit",
    client: "Government of Madhya Pradesh",
    year: 2014,
    domains: ["PR & Media Strategy", "Brand Building", "Art & Design"],
    industries: ["Government", "Events"],
    locations: ["Bhopal"],
    featured: false,
    order: 7,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Position Bhopal as an investment-ready city on the global stage at the Madhya Pradesh Global Investor Summit — creating a city brand narrative that resonates with domestic and international investors.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Investors don't invest in infrastructure alone — they invest in narrative momentum. 'Kamaal Ka Bhopal' framed the city's potential as already in motion, not aspirational.",
        media: [],
      },
      {
        heading: "The Build",
        body: "City branding concept, investor collateral, exhibition design, multimedia presentations, press outreach, and a live experience showcasing Bhopal's industrial and cultural potential.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Strong investor response, national media coverage, and the campaign narrative was cited in subsequent government investment pitches as a reference point.",
        media: [],
      },
    ],
    outcomes: [
      "National media coverage for Bhopal",
      "Cited in government investment pitches",
      "Strong investor interest generated",
    ],
  },
  {
    slug: "ajinkya-rahane-platina",
    title: "Ajinkya Rahane Factor at Platina",
    client: "Platina Group",
    year: 2017,
    domains: ["Brand Building", "PR & Media Strategy"],
    industries: ["Real Estate"],
    locations: ["Bhopal"],
    featured: false,
    order: 8,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Leverage cricketer Ajinkya Rahane's endorsement to create trust and aspiration for Platina's premium residential offering in the Central Indian market.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Celebrity endorsements in real estate often feel hollow. The strategy was to make Rahane's presence feel like a genuine investment decision — 'If Rahane trusts Platina, so can you.'",
        media: [],
      },
      {
        heading: "The Build",
        body: "Campaign concept tying Rahane's reputation for consistency and reliability to Platina's construction quality. Launch event, media coverage, outdoor campaign, and social amplification.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Significant footfall at the launch event, strong media pickup in both sports and real estate verticals, and measurable lead generation uplift during the campaign window.",
        media: [],
      },
    ],
    outcomes: [
      "Cross-vertical media coverage",
      "Launch event oversubscribed",
      "Lead generation uplift during campaign",
    ],
  },
  {
    slug: "pinkwalk",
    title: "PinkWalk Mall",
    client: "Manglam Group",
    year: 2024,
    domains: ["Brand Building", "Business Innovations"],
    industries: ["Real Estate", "Retail"],
    locations: ["Jaipur"],
    featured: true,
    order: 9,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Position PinkWalk as the most premium retail and business destination in Jaipur, building investor confidence through proof-led storytelling and a distinctive brand narrative.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "In high-value real estate, perception is a compounding asset. Investors buy belief first — then fundamentals. The name 'PinkWalk' needed to own Jaipur's identity.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Brand narrative and identity refinement, launch collateral, stakeholder presentation decks, a case-study-driven communication approach, and digital presence strategy.",
        media: [],
      },
      {
        heading: "The Result",
        body: "A premium brand story that elevated recall, strengthened investor trust, and attracted top-tier retail and commercial interest from national brands.",
        media: [],
      },
    ],
    outcomes: [
      "Premium perception lift in Jaipur market",
      "National brand tenant interest",
      "Stronger investor confidence metrics",
    ],
  },
  {
    slug: "14-woodland-park",
    title: "14 Woodland Park",
    client: "Woodland Group",
    year: 2021,
    domains: ["Brand Building", "Art & Design"],
    industries: ["Real Estate"],
    locations: ["Bhopal"],
    featured: false,
    order: 10,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Create a distinctive luxury residential brand for a 14-unit premium villa project — making exclusivity the core selling proposition in a market saturated with cookie-cutter developments.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "When you only have 14 units, scarcity is your greatest asset. The brand needed to make 'limited' feel intentional, not small.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Brand identity with a bespoke numbering system, premium collateral suite, private viewing experience design, and a referral-first sales strategy.",
        media: [],
      },
      {
        heading: "The Result",
        body: "All 14 units sold through referral and private viewings alone — no mass advertising required. The project became a reference for luxury positioning in Central India.",
        media: [],
      },
    ],
    outcomes: [
      "100% sold through referrals",
      "Zero mass advertising spend",
      "Luxury benchmark in Central India",
    ],
  },
  {
    slug: "manglam-aananda",
    title: "Manglam Aananda",
    client: "Manglam Group",
    year: 2023,
    domains: ["Brand Building", "PR & Media Strategy", "Social Media Management"],
    industries: ["Real Estate"],
    locations: ["Jaipur"],
    featured: false,
    order: 11,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Launch Manglam Aananda as a premium plotted development in Jaipur's competitive residential market — differentiating on lifestyle promise, not just land value.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Plot buyers in Jaipur think in terms of per-square-yard rate. The opportunity was to shift the conversation to 'What kind of life will you build here?' — from commodity to community.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Brand naming and positioning, lifestyle-led communication, PR campaign targeting lifestyle and business media, social campaign with community stories, and launch event.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Strong pre-launch interest, a waitlist that exceeded initial inventory, and PR coverage that positioned Aananda as a lifestyle choice, not just a real estate purchase.",
        media: [],
      },
    ],
    outcomes: [
      "Pre-launch waitlist exceeded inventory",
      "Lifestyle media coverage achieved",
      "Premium pricing sustained",
    ],
  },
  {
    slug: "the-future-city",
    title: "The Future City",
    client: "Future Group",
    year: 2020,
    domains: ["Business Innovations", "AI & Tech Solutions", "Brand Building"],
    industries: ["Real Estate", "Smart Cities"],
    locations: ["Delhi NCR"],
    featured: false,
    order: 12,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Conceptualize and brand a smart-city-inspired township project — making futuristic infrastructure feel tangible and desirable for today's buyers.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Smart city narratives often feel dystopian or overpromised. The key was to make technology feel warm, human, and like a natural upgrade to daily life.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Smart-city branding framework, experiential tech demos for sales galleries, a storytelling approach that dramatized daily life improvements, and influencer partnerships.",
        media: [],
      },
      {
        heading: "The Result",
        body: "A compelling brand that made 'smart living' approachable. Strong media interest and a differentiated sales narrative that outperformed comparable projects.",
        media: [],
      },
    ],
    outcomes: [
      "Differentiated market positioning",
      "Tech-forward brand perception",
      "Outperformed comparable project sales",
    ],
  },
  {
    slug: "rg-live",
    title: "RG Live",
    client: "Political Campaign",
    year: 2018,
    domains: ["Business Innovations", "AI & Tech Solutions"],
    industries: ["Political Communication"],
    locations: ["Delhi NCR"],
    featured: false,
    order: 13,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Increase reach and recall of a political leader's speeches with a scalable, repeatable setup that can travel across constituencies and feel immersive.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "In Indian politics, physical presence equals trust. A mobile LED van with a high-production-value recorded speech could deliver presence at scale — bringing the leader to every street corner.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Custom mobile van with LED screen, high-quality speech recording and post-production, route planning for maximum constituency coverage, and crowd management protocols.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Higher reach through mobility and multiple screenings, stronger message recall through controlled production quality, and a repeatable model deployed across multiple constituencies.",
        media: [],
      },
    ],
    outcomes: [
      "Scalable outreach model",
      "Higher message recall",
      "Deployed across multiple constituencies",
    ],
  },
  {
    slug: "scindia-live",
    title: "Scindia Live",
    client: "Political Campaign",
    year: 2019,
    domains: ["PR & Media Strategy", "Social Media Management"],
    industries: ["Political Communication"],
    locations: ["Bhopal"],
    featured: false,
    order: 14,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Build a modern digital communication strategy for a political figure — creating a personal brand that resonates with younger voters while maintaining credibility with traditional constituents.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Political personal branding in India was stuck in a rallies-and-posters era. The opportunity was to humanize the candidate through accessible, authentic social media storytelling.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Social media strategy and content calendar, behind-the-scenes content series, constituency connection stories, real-time event coverage, and a responsive engagement protocol.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Significant growth in digital following, improved perception among younger demographics, and a digital-first communication model that was adopted as standard practice.",
        media: [],
      },
    ],
    outcomes: [
      "Digital following growth across platforms",
      "Younger demographic engagement",
      "Digital-first model adopted as standard",
    ],
  },
  {
    slug: "united-by-food",
    title: "United By Food (UBF)",
    client: "UBF",
    year: 2023,
    domains: ["Brand Building", "Social Media Management", "Art & Design"],
    industries: ["Food & Beverage", "Events"],
    locations: ["Jaipur", "Delhi NCR"],
    featured: false,
    order: 15,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Build a food festival brand that goes beyond the typical 'food stall' format — creating a cultural experience where food is the medium, not just the menu.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "Food festivals in India were becoming commodity events. The differentiator was curation — treating food as art, storytelling, and community, not just consumption.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Brand identity and naming, chef and vendor curation strategy, experiential zone design, social-first marketing campaign, influencer partnerships, and ticketing strategy.",
        media: [],
      },
      {
        heading: "The Result",
        body: "A sold-out inaugural edition, strong social media footprint, media coverage across food and lifestyle verticals, and a brand foundation for annual scaling.",
        media: [],
      },
    ],
    outcomes: [
      "Sold-out inaugural edition",
      "Strong social media footprint",
      "Foundation for annual franchise",
    ],
  },
  {
    slug: "polywood-rebrand",
    title: "Polywood Rebranding",
    client: "Polywood",
    year: 2020,
    domains: ["Brand Building", "Art & Design"],
    industries: ["Manufacturing"],
    locations: ["Delhi NCR"],
    featured: false,
    order: 16,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Shift perception of Polywood from 'plastic furniture manufacturer' to 'protector of nature and trees' — a credible sustainability-led rebrand in a skeptical market.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "The irony was powerful: a company using synthetic materials was saving more trees than most 'eco-friendly' brands. The rebrand needed to make this truth feel ownable and authentic.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Complete brand repositioning, new visual identity system, documentary-style storytelling approach, sustainability metrics framework, and a PR campaign anchoring the narrative in proof.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Improved brand meaning and recall in a competitive segment. The sustainability angle became Polywood's strongest differentiator, adopted across all communication.",
        media: [],
      },
    ],
    outcomes: [
      "Sustainability narrative established",
      "Stronger brand recall in market",
      "Differentiation in competitive segment",
    ],
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const item of data) {
    await CaseStudy.updateOne(
      { slug: item.slug },
      { $set: item },
      { upsert: true }
    );
    console.log(`  Upserted: ${item.slug}`);
  }

  const count = await CaseStudy.countDocuments();
  console.log(`\nSeed complete. ${count} case studies in database.`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
