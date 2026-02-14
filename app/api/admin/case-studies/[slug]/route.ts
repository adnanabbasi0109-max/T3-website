import { NextRequest, NextResponse } from "next/server";
import { requireAdminAPI } from "../../../../../lib/auth";
import { dbConnect } from "../../../../../lib/db";
import { CaseStudy } from "../../../../../models/CaseStudy";

type RouteCtx = { params: Promise<{ slug: string }> };

/** GET /api/admin/case-studies/[slug] */
export async function GET(req: NextRequest, { params }: RouteCtx) {
  const authErr = requireAdminAPI(req);
  if (authErr) return authErr;

  try {
    await dbConnect();
    const { slug } = await params;
    const item = await CaseStudy.findOne({ slug }).lean();

    if (!item) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}

/** PUT /api/admin/case-studies/[slug] */
export async function PUT(req: NextRequest, { params }: RouteCtx) {
  const authErr = requireAdminAPI(req);
  if (authErr) return authErr;

  try {
    await dbConnect();
    const { slug } = await params;
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }

    // If slug is being changed, sanitize and check uniqueness
    if (body.slug && body.slug !== slug) {
      body.slug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const conflict = await CaseStudy.findOne({ slug: body.slug });
      if (conflict) {
        return NextResponse.json(
          { error: "A case study with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const item = await CaseStudy.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!item) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ item });
  } catch (err) {
    console.error("PUT /api/admin/case-studies/[slug] error:", err);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

/** DELETE /api/admin/case-studies/[slug] */
export async function DELETE(req: NextRequest, { params }: RouteCtx) {
  const authErr = requireAdminAPI(req);
  if (authErr) return authErr;

  try {
    await dbConnect();
    const { slug } = await params;
    const item = await CaseStudy.findOneAndDelete({ slug });

    if (!item) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
