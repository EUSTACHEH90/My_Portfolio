import { Resend } from "resend";

// Limitation simple : 3 messages par IP et par tranche de 10 minutes.
// Elle vit en mémoire : utile contre le spam basique, mais pas infaillible sur Vercel
// (chaque instance a sa propre mémoire).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 3;

function isLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_HITS;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  return limited;
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const website = String(body.website ?? ""); // champ piège (honeypot)
  const startedAt = Number(body.startedAt);

  // Bots : champ piège rempli, ou formulaire envoyé en moins de 3 secondes.
  // On répond « ok » sans rien envoyer pour ne pas les renseigner.
  if (website || !Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return Response.json({ ok: true });
  }

  if (name.length < 2 || name.length > 100) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 3000) {
    return Response.json({ error: "Your message should be between 10 and 3000 characters." }, { status: 400 });
  }

  if (website || !Number.isFinite(startedAt) || startedAt <= 0 || Date.now() - startedAt < 3000) {
    return Response.json({ ok: true });
    }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isLimited(ip)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return Response.json({ error: "The contact form is not configured yet." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email, // vous répondez directement à la personne
    subject: `Portfolio: new message from ${name.replace(/[\r\n]+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Something went wrong. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}