// app/api/sendEmail/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, html, subject } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  });

  return new Response(JSON.stringify({ message: "Email sent" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
