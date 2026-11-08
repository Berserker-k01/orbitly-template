import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + windowMs });
    return false; // not limited
  }
  record.count++;
  if (record.count > limit) return true; // limited
  return false;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "16kb" }));

  // ── Contact form endpoint ─────────────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";

    if (rateLimit(ip)) {
      return res.status(429).json({ error: "Too many requests. Please wait before trying again." });
    }

    const { firstName, lastName, email, phone, country, type, message, consent } = req.body ?? {};

    // Validation
    if (!firstName || !lastName || !email || !type || !message || !consent) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }
    if (message.length < 10 || message.length > 5000) {
      return res.status(400).json({ error: "Message length invalid." });
    }

    // Log the contact request (replace with email sending when configured)
    const contactData = {
      timestamp: new Date().toISOString(),
      firstName, lastName, email,
      phone: phone || "—",
      country: country || "—",
      type,
      message: message.substring(0, 500),
    };

    console.log("[Summit One] New contact submission:", JSON.stringify(contactData, null, 2));

    // TODO: Configure email sending (Resend, SendGrid, Nodemailer, etc.)
    // const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "summit.one.contact@gmail.com";
    // await sendEmail({ to: CONTACT_EMAIL, subject: `[Summit One] ${type} — ${firstName} ${lastName}`, body: ... });

    return res.status(200).json({ success: true });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing — serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`[Summit One] Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
