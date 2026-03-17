const express = require('express');
const router = express.Router();
const path = require('path');
const { sendEmail } = require(path.resolve(__dirname, '../utils/sendEmail'));

router.post('/api/contact', async (req, res) => {
  console.log('Contact route hit');
  const { name, email, phone, message } = req.body;
  console.log("Received contact data:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    console.log("Attempting to send email...");
    await sendEmail({ name, email, phone, message });
    console.log("Email sent successfully");
    res.status(200).json({ success: true, message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Failed to send email:", error.stack || error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
