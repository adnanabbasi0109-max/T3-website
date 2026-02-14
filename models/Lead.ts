import { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    challengeType: { type: String },
    selectedCaseSlugs: [{ type: String }],
    message: { type: String },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model("Lead", LeadSchema);
