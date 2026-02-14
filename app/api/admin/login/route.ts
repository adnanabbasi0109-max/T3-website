import { NextRequest, NextResponse } from "next/server";
import {
  checkPassword,
  createSession,
  sessionCookieValue,
  clearSessionCookieValue,
} from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = body?.password;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!checkPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = createSession();
    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", sessionCookieValue(token));
    return res;
  } catch {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearSessionCookieValue());
  return res;
}
