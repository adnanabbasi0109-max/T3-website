import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db";
import { CaseStudy } from "../../../models/CaseStudy";

export async function GET() {
  try {
    await dbConnect();

    const items = await CaseStudy.find()
      .sort({ featured: -1, order: 1, year: -1 })
      .lean();

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/case-studies error:", err);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
