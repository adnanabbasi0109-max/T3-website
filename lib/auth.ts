import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "t3_admin";
const MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("Missing ADMIN_PASSWORD in env");
  return s;
}

/** Create a signed token: payload.signature */
function sign(payload: string): string {
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${sig}`;
}

/** Verify a signed token. Returns the payload if valid, null otherwise. */
function verify(token: string): string | null {
  const idx = token.lastIndexOf(".");
  if (idx === -1) return null;

  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);

  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  // Constant-time comparison
  if (sig.length !== expected.length) return null;
  const valid = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!valid) return null;

  // Check expiry
  try {
    const data = JSON.parse(payload);
    if (typeof data.exp === "number" && Date.now() > data.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Check if the provided password matches ADMIN_PASSWORD. */
export function checkPassword(password: string): boolean {
  const expected = getSecret();
  if (password.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

/** Create a signed session cookie value. */
export function createSession(): string {
  const payload = JSON.stringify({
    sub: "admin",
    iat: Date.now(),
    exp: Date.now() + MAX_AGE * 1000,
    jti: randomBytes(8).toString("hex"),
  });
  return sign(payload);
}

/** Build Set-Cookie header value for the session. */
export function sessionCookieValue(token: string): string {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${MAX_AGE}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

/** Build Set-Cookie header value to clear the session. */
export function clearSessionCookieValue(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/**
 * Verify admin auth from a NextRequest (for API routes).
 * Returns a 401 NextResponse if invalid, or null if valid.
 */
export function requireAdminAPI(req: NextRequest): NextResponse | null {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verify(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/**
 * Check admin auth from server component (reads cookies()).
 * Returns true if the admin session is valid.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verify(token) !== null;
}
