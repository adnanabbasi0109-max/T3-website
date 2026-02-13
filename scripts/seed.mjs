import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });

import mongoose from "mongoose";

const MONGODB_URI = (process.env.MONGODB_URI || "").trim();

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI. Add it to .env.local");
}

console.log("URI first 40:", JSON.stringify(MONGODB_URI.slice(0, 40)));
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI. Add it to .env.local");
}

// Minimal schema for seeding (works even if your app uses TS models)
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
    slug: "pinkwalk",
    title: "PinkWalk Mall",
    client: "Manglam Group",
    year: 2024,
    domains: ["Brand Building", "Business Innovations", "Creative Consulting"],
    industries: ["Real Estate", "Retail"],
    locations: ["Jaipur"],
    featured: true,
    order: 1,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Position PinkWalk as the most premium retail + business destination, and build investor confidence through proof-led storytelling.",
        media: [],
      },
      {
        heading: "The Insight",
        body: "In high-value real estate, perception is a compounding asset. Investors buy belief first—then fundamentals.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Narrative, identity refinement, launch collateral, stakeholder decks, and a case-study-driven communication approach to reduce decision friction.",
        media: [],
      },
      {
        heading: "The Result",
        body: "A premium brand story that elevated recall, strengthened investor trust, and helped attract top-tier interest.",
        media: [],
      },
    ],
    outcomes: ["Premium perception lift", "Higher investor confidence", "Clearer positioning"],
  },
  {
    slug: "giovanni-village",
    title: "Giovanni Village Luxury Resort",
    client: "Giovanni",
    year: 2019,
    domains: ["Brand Building", "Experience Design", "Digital"],
    industries: ["Hospitality"],
    locations: ["Bhopal"],
    featured: true,
    order: 2,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Build a luxury hospitality brand from inception—identity, experience, and communication that feels coherent at every touchpoint.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Brand identity, on-ground guest experience design, signage and aesthetics direction, website, and social presence.",
        media: [],
      },
      {
        heading: "The Result",
        body: "A cohesive premium brand with a consistent experience narrative—online and offline—built to scale into future sub-brands.",
        media: [],
      },
    ],
    outcomes: ["Cohesive brand system", "Luxury positioning", "Consistent guest experience"],
  },
  {
    slug: "polywood-rebrand",
    title: "Polywood Rebranding",
    client: "Polywood",
    year: 2020,
    domains: ["Brand Strategy", "Perception Building", "Content"],
    industries: ["Manufacturing"],
    locations: ["India"],
    featured: false,
    order: 3,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Shift perception from ‘non-nature-friendly’ to ‘protecting nature and trees’ with a credible, modern identity and communication story.",
        media: [],
      },
      {
        heading: "The Build",
        body: "Repositioning narrative, visual identity direction, and a documentary-led storytelling approach to anchor belief with proof.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Improved brand meaning and recall in a competitive segment by making the sustainability angle feel authentic and ownable.",
        media: [],
      },
    ],
    outcomes: ["Stronger perception", "Clearer brand meaning", "Improved recall"],
  },
  {
    slug: "rg-live",
    title: "RG Live (Virtual Political Communication Innovation)",
    client: "Political Campaign",
    year: 2018,
    domains: ["Innovation", "Experiential", "Production"],
    industries: ["Political Communication"],
    locations: ["India"],
    featured: false,
    order: 4,
    heroImage: "",
    gallery: [],
    sections: [
      {
        heading: "The Brief",
        body: "Increase reach and recall of a leader’s speech with a scalable, repeatable setup that can travel and feel immersive.",
        media: [],
      },
      {
        heading: "The Big Idea",
        body: "A mobile van with an LED screen playing a high-quality pre-recorded speech, supported by visuals to enhance clarity and impact.",
        media: [],
      },
      {
        heading: "The Result",
        body: "Higher reach through mobility and multiple screenings, and stronger message recall through controlled production quality.",
        media: [],
      },
    ],
    outcomes: ["Scalable outreach", "Higher recall", "Repeatable execution model"],
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  for (const item of data) {
    // Upsert = update if exists, insert if not
    await CaseStudy.updateOne({ slug: item.slug }, { $set: item }, { upsert: true });
  }

  const count = await CaseStudy.countDocuments();
  console.log(`✅ Seed complete. Case studies in DB: ${count}`);

  await mongoose.disconnect();
  console.log("✅ Disconnected");
}

run().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});