import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Hiányzó mezők." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Kapcsolat" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Új üzenet a portfolióból – ${name}`,
      text: `Feladó: ${name}\nEmail: ${email}\n\nÜzenet:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f5f7; border-radius: 16px;">
          <h2 style="color: #1d1d1f; font-size: 22px; margin-bottom: 4px;">Új üzenet érkezett</h2>
          <p style="color: #6e6e73; font-size: 13px; margin-top: 0;">Portfolio kapcsolati form</p>
          <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 24px 0;" />
          <p style="margin: 0 0 8px;"><strong style="color: #1d1d1f;">Feladó:</strong> <span style="color: #0071e3;">${name}</span></p>
          <p style="margin: 0 0 24px;"><strong style="color: #1d1d1f;">Email:</strong> <a href="mailto:${email}" style="color: #0071e3;">${email}</a></p>
          <div style="background: white; border-radius: 12px; padding: 20px;">
            <p style="color: #6e6e73; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Üzenet</p>
            <p style="color: #1d1d1f; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email küldési hiba:", err);
    return NextResponse.json({ error: "Email küldése sikertelen." }, { status: 500 });
  }
}
