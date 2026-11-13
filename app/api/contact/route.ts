import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  _honey: z.string().max(0),
});

// Simple in-memory rate limit (per IP, resets on cold start)
const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);
  if (!limit || now > limit.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (limit.count >= 3) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limit
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: result.error.issues },
      { status: 422 }
    );
  }

  const { name, email, message } = result.data;

  // Send via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "numanfaisal980@gmail.com";

  if (!RESEND_API_KEY) {
    // Dev fallback — log and succeed
    console.info("[Contact form] Dev mode — email would be sent:", { name, email, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0B0B0F; color: #F4F4F5; border-radius: 12px;">
          <h2 style="margin: 0 0 24px; font-size: 24px; font-weight: 700;">New portfolio message</h2>
          <div style="background: #14141A; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; color: #A1A1AA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">From</p>
            <p style="margin: 0; font-weight: 600;">${name} &lt;${email}&gt;</p>
          </div>
          <div style="background: #14141A; border-radius: 8px; padding: 20px;">
            <p style="margin: 0 0 8px; color: #A1A1AA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin: 24px 0 0; color: #A1A1AA; font-size: 12px;">Sent from numanfaisal.dev portfolio contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
