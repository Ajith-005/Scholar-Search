const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: "Test Email",
    text: "This is a test email from Nodemailer.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Failed to send test email:", error);
  }
}

testEmail();
