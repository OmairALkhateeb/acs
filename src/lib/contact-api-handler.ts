import nodemailer from "nodemailer";
import { z } from "zod";

const contactBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  message: z.string().trim().min(1, "Message is required"),
  website: z
    .string()
    .nullish()
    .transform((v) => (v ?? "").trim()),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function logSendFailure(err: unknown) {
  if (err && typeof err === "object" && "message" in err) {
    const o = err as {
      message?: string;
      response?: string;
      responseCode?: number;
      code?: string;
    };
    console.error("contact: sendMail failed", {
      message: o.message,
      code: o.code,
      responseCode: o.responseCode,
      response: o.response,
    });
    return;
  }
  console.error("contact: sendMail failed", { err });
}

/**
 * Shared POST /api/contact handler (TanStack Start server route or Next.js App Router).
 * Compatible with Vercel serverless (Node). Secrets read from process.env only.
 */
export async function handleContactPost(request: Request): Promise<Response> {
  console.info("contact: request received", {
    method: request.method,
    contentType: request.headers.get("content-type") ?? null,
  });

  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    console.warn("contact: rejected non-json content type");
    return Response.json({ error: "Invalid content type" }, { status: 415 });
  }

  let json: unknown;
  try {
    json = await request.json();
    console.info("contact: json body parsed");
  } catch {
    console.warn("contact: invalid json body");
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactBodySchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.name?.[0] ?? first.email?.[0] ?? first.message?.[0] ?? "Invalid request body";
    console.warn("contact: validation failed", { error: msg });
    return Response.json({ error: msg }, { status: 400 });
  }

  const { name, email, message, website } = parsed.data;

  if (website.length > 0) {
    console.warn("contact: honeypot triggered");
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  console.info("contact: validated payload", {
    nameLength: name.length,
    messageLength: message.length,
    hasWebsiteValue: website.length > 0,
  });

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT);

  if (!host || !user || !pass || !Number.isFinite(port) || port < 1 || port > 65535) {
    console.error("contact: missing or invalid SMTP env (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)");
    return Response.json({ error: "Server configuration error" }, { status: 500 });
  }

  const to = process.env.CONTACT_RECEIVER || "Info@acs-mc.com";
  console.info("contact: smtp config ready", {
    host,
    port,
    secure: port === 465,
    to,
    from: user,
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r\n/g, "\n").replace(/\n/g, "<br />");

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
  <h2 style="margin: 0 0 1rem;">New contact message</h2>
  <p style="margin: 0 0 0.5rem;"><strong>Name:</strong> ${safeName}</p>
  <p style="margin: 0 0 0.5rem;"><strong>Email:</strong> ${safeEmail}</p>
  <p style="margin: 0 0 0.25rem;"><strong>Message:</strong></p>
  <div style="margin: 0; padding: 1rem; background: #f4f4f5; border-radius: 8px;">${safeMessage}</div>
</body>
</html>`.trim();

  try {
    console.info("contact: sending email");
    await transporter.sendMail({
      from: user,
      to,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html,
    });
    console.info("contact: email sent successfully", { to, replyTo: email });
  } catch (err) {
    logSendFailure(err);
    return Response.json({ error: "Failed to send message" }, { status: 502 });
  }

  console.info("contact: request completed");
  return Response.json({ ok: true });
}
