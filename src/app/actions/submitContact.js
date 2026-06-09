"use server"

export async function submitContact(formData) {
  const data = {
    name:    formData.get("name"),
    phone:   formData.get("phone"),
    email:   formData.get("email"),
    message: formData.get("message"),
  }

  if (!data.name || !data.phone || !data.message) {
    return { success: false, error: "Name, phone and message are required." }
  }

  try {
    const nodemailer = await import("nodemailer")
    const transporter = nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "wjatt4752@gmail.com",
      subject: `New Contact Message from ${data.name}`,
      html: `
        <h2>New Contact Message</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${data.email || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>
        </table>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error("Email error:", err)
    return { success: false, error: "Failed to send. Please call us at 580-226-7811." }
  }
}