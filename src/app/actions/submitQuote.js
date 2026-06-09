"use server"

export async function submitQuote(formData) {
  const data = {
    name:      formData.get("name"),
    phone:     formData.get("phone"),
    email:     formData.get("email"),
    company:   formData.get("company"),
    equipment: formData.getAll("equipment"),
    service:   formData.get("service"),
    duration:  formData.get("duration"),
    location:  formData.get("location"),
    notes:     formData.get("notes"),
  }

  if (!data.name || !data.phone) {
    return { success: false, error: "Name and phone are required." }
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

    // Verify connection first
    await transporter.verify()

    await transporter.sendMail({
      from: `"Ardmore Trailer" <${process.env.EMAIL_USER}>`,
      to:   "wjatt4752@gmail.com",
      subject: `New Quote Request from ${data.name}`,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${data.email || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd">${data.company || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Equipment</strong></td><td style="padding:8px;border:1px solid #ddd">${data.equipment.join(", ") || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Service Type</strong></td><td style="padding:8px;border:1px solid #ddd">${data.service || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Duration</strong></td><td style="padding:8px;border:1px solid #ddd">${data.duration || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Location</strong></td><td style="padding:8px;border:1px solid #ddd">${data.location || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Notes</strong></td><td style="padding:8px;border:1px solid #ddd">${data.notes || "N/A"}</td></tr>
        </table>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error("Email error:", err)
    console.error("Error details:", err.message)
    return { success: false, error: `Failed to send: ${err.message}` }
  }
}