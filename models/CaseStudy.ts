import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
    media: [{ type: String }],
  },
  { _id: false }
);

const CaseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    client: { type: String },
    year: { type: Number },
    domains: [{ type: String }],
    industries: [{ type: String }],
    locations: [{ type: String }],
    heroImage: { type: String },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    sections: [SectionSchema],
    outcomes: [{ type: String }],
  },
  { timestamps: true }
);

export const CaseStudy =
  models.CaseStudy || model("CaseStudy", CaseStudySchema);
