const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter;
const isDev = process.env.NODE_ENV !== "production";
const devLogEnabled = isDev && process.env.EMAIL_DEV_LOG === "true";

function makeConsoleTransport() {
  return {
    sendMail: async (mailOptions) => {
      console.log("---[DEV EMAIL - logged instead of sent]---");
      console.log(JSON.stringify(mailOptions, null, 2));
      console.log("-----------------------------------------");
      return Promise.resolve({ accepted: [mailOptions.to], messageId: "dev" });
    },
  };
}

if (devLogEnabled) {
  transporter = makeConsoleTransport();
  console.log("Email dev-logging enabled: emails will be logged, not sent.");
} else {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST || undefined,
    port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
    secure: process.env.EMAIL_SECURE === "true" || false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify transporter and fallback to console logger in dev if verification fails
  transporter.verify()
    .then(() => console.log("Email transporter verified"))
    .catch((err) => {
      console.error("Email transporter verification failed:", err);
      if (isDev) {
        console.log("Falling back to console logging for emails in dev environment.");
        transporter = makeConsoleTransport();
      }
    });
}

// Helper to normalize send result and consistent error messaging
async function safeSend(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent/handled:", info && info.messageId ? info.messageId : info);
    return info;
  } catch (error) {
    console.error("sendMail error:", error && error.message ? error.message : error);
    throw error;
  }
}

// Send OTP Email (forgot password)
async function sendOtpEmail({ toEmail, otp }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your Password Reset OTP",
    text: `Your OTP code is: ${otp}`,
    html: `<h2>Password Reset OTP</h2><p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  return safeSend(mailOptions);
}

// Send Contact Inquiry Email
async function sendEmail({ name, email, phone = "N/A", message }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_RECIPIENT || 'harasubukarthi@gmail.com', // Your recipient email
    subject: "New Contact Message",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  return safeSend(mailOptions);
}

module.exports = {
  sendOtpEmail,
  sendEmail,
};
