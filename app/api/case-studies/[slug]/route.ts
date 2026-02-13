import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db";
import { CaseStudy } from "../../../../models/CaseStudy";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    const item = await CaseStudy.findOne({ slug }).lean();

    if (!item) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ item });
  } catch (err) {
    console.error(`GET /api/case-studies/[slug] error:`, err);
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}
