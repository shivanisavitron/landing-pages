import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

const PORT = process.env.PORT || 3001;
const RECIPIENT_EMAIL = process.env.QUOTE_RECIPIENT || process.env.SMTP_USER;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Zoho CRM Web-to-Lead. This is a public, unauthenticated form-submission
// endpoint (no API key/OAuth involved) — it's designed by Zoho to be
// posted directly from a browser, which is why it's safe to also post to
// server-side. xnQsjsdp/xmIwtLD identify which generated form/org this
// submission routes to; they are not API credentials, but are still kept
// in env vars rather than hardcoded so they're not casually copied out of
// source and can be rotated without a code change.
const ZOHO_WEBTOLEAD_URL = "https://crm.zoho.in/crm/WebToLeadForm";

async function submitToZohoLead({ name, email, phone, description }) {
  const body = new URLSearchParams({
    xnQsjsdp: process.env.ZOHO_XNQSJSDP,
    zc_gad: "",
    xmIwtLD: process.env.ZOHO_XMIWTLD,
    actionType: "TGVhZHM=",
    returnURL: "null",
    "Last Name": name,
    Email: email,
    Phone: phone,
    Description: description || "",
    // Honeypot field from the generated form — must always stay empty.
    aG9uZXlwb3Q: "",
  });

  // Zoho responds with an HTTP redirect to `returnURL` on success (the
  // normal browser-form flow). `returnURL` here is literally the string
  // "null", so we must NOT let fetch auto-follow it — it would try to
  // parse "null" as a URL and throw, even though the lead was already
  // created. `redirect: "manual"` reports the redirect as an opaque
  // response instead, which we treat as success.
  const response = await fetch(ZOHO_WEBTOLEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    redirect: "manual",
  });

  const succeeded = response.type === "opaqueredirect" || response.ok;
  if (!succeeded) {
    throw new Error(`Zoho CRM responded with status ${response.status}`);
  }
}

const app = express();
app.use(express.json());

app.post("/api/quote", async (req, res) => {
  const { name, email, phone, description, product } = req.body ?? {};

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  // Email and CRM lead creation are attempted independently — each exactly
  // once per request — so a failure in one never blocks, retries, or
  // duplicates the other.
  let emailSucceeded = false;
  let crmSucceeded = false;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Quote Request — ${product || "Website"}`,
      text: [
        `Product: ${product || "N/A"}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Description:",
        description || "(none provided)",
      ].join("\n"),
    });
    emailSucceeded = true;
  } catch (err) {
    console.error("Failed to send quote email:", err);
  }

  try {
    await submitToZohoLead({ name, email, phone, description });
    crmSucceeded = true;
  } catch (err) {
    // Logged safely on the server only — never exposed to the client.
    console.error("Failed to create Zoho CRM lead:", err);
  }

  if (!emailSucceeded) {
    return res
      .status(500)
      .json({ success: false, crmSuccess: crmSucceeded, error: "Failed to send email" });
  }

  res.json({ success: true, crmSuccess: crmSucceeded });
});

app.use(express.static(distDir));

// SPA fallback so direct loads of /parseit, /atithi, etc. work. Uses a
// path-less middleware (not a "*" route) since Express 5's router no
// longer accepts a bare wildcard pattern.
app.use((req, res) => {
  if (req.method !== "GET") {
    return res.status(404).end();
  }
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
