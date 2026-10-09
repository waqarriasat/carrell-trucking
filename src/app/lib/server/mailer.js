import "server-only"

// Uses the same Gmail SMTP credentials as the quote/contact forms
// (EMAIL_USER / EMAIL_PASS). SMTP_HOST / SMTP_PORT can override the server.
export function isMailConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
}

export async function sendMail({ to, subject, html, text, fromName = "Website Admin", replyTo }) {
  const nodemailer = await import("nodemailer")
  const port = Number(process.env.SMTP_PORT || 465)
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  await transporter.sendMail({
    from: `"${fromName.replace(/"/g, "")}" <${process.env.EMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
    text,
  })
}
