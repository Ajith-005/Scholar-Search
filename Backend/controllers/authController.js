const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendOtpEmail } = require("../utils/sendEmail");

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : email;
}

module.exports = {
  register: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ fullName, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.fullName,
          email: newUser.email,
          avatar: null,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).send("Server error");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
      res.json({
        token,
        user: {
          id: user._id,
          name: user.fullName,
          email: user.email,
          avatar: user.avatar || null,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Server error");
    }
  },

  forgotPassword: async (req, res) => {
    try {
      console.log('forgotPassword called with body:', req.body);
      const { email } = req.body;
      const normalized = normalizeEmail(email);
      const user = await User.findOne({ email: normalized });
      if (!user) return res.status(404).json({ message: "User not found" });

      const otp = generateOTP();
      const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
      user.resetPasswordOTP = otp;
      user.resetPasswordExpires = new Date(expires);
      await user.save();

      await sendOtpEmail({ toEmail: normalized, otp });

      res.json({ message: "OTP sent to your email" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const normalized = normalizeEmail(email);
      const user = await User.findOne({ email: normalized });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
        return res.status(400).json({ message: "No OTP requested" });
      }
      if (Date.now() > new Date(user.resetPasswordExpires).getTime()) {
        return res.status(400).json({ message: "OTP expired" });
      }
      if (user.resetPasswordOTP !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      res.json({ message: "OTP verified" });
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) return res.status(400).json({ message: "Missing fields" });
      const normalized = normalizeEmail(email);
      const user = await User.findOne({ email: normalized });
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
        return res.status(400).json({ message: "No OTP requested" });
      }
      if (Date.now() > new Date(user.resetPasswordExpires).getTime()) {
        return res.status(400).json({ message: "OTP expired" });
      }
      if (user.resetPasswordOTP !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      user.resetPasswordOTP = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  setAvatar: async (req, res) => {
    try {
      const userId = req.user.id;
      const avatar = req.body.avatar;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.avatar) return res.status(400).json({ message: "Avatar already chosen" });
      user.avatar = avatar;
      await user.save();
      res.json({ avatar });
    } catch (error) {
      console.error("Set avatar error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
