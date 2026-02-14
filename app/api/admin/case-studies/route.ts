import { NextRequest, NextResponse } from "next/server";
import { requireAdminAPI } from "../../../../lib/auth";
import { dbConnect } from "../../../../lib/db";
import { CaseStudy } from "../../../../models/CaseStudy";

/** GET /api/admin/case-studies — list all (admin) */
export async function GET(req: NextRequest) {
  const authErr = requireAdminAPI(req);
  if (authErr) return authErr;

  try {
    await dbConnect();
    const items = await CaseStudy.find()
      .sort({ featured: -1, order: 1, year: -1 })
      .lean();
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

/** POST /api/admin/case-studies — create */
export async function POST(req: NextRequest) {
  const authErr = requireAdminAPI(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();

    if (!body.slug || !body.title) {
      return NextResponse.json(
        { error: "slug and title are required" },
        { status: 400 }
      );
    }

    // Sanitize slug
    body.slug = body.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    await dbConnect();

    const existing = await CaseStudy.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { error: "A case study with this slug already exists" },
        { status: 409 }
      );
    }

    const doc = await CaseStudy.create(body);
    return NextResponse.json({ item: doc.toObject() }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/case-studies error:", err);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
