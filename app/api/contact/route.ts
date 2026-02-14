import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db";
import { Lead } from "../../../models/Lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    await dbConnect();

    await Lead.create({
      name: name.trim(),
      email: email.trim(),
      company: body.company?.trim() || undefined,
      challengeType: body.challengeType?.trim() || undefined,
      selectedCaseSlugs: body.selectedCaseSlugs || [],
      message: (message || body.message || "").trim() || undefined,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
