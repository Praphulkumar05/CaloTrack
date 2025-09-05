const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const axios = require('axios');
const crypto = require("crypto");
const Otp = require("../models/Otp");
const transporter = require("../config/email"); // your nodemailer transporter
const { generateToken } = require("../utils/jwt");
const nodemailer = require("nodemailer");


const localTransporter = nodemailer.createTransport({
  service: "Gmail", // or SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const localGenerateToken  = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};



const otpStore = new Map();

// Helper: generate 6-digit numeric OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    email = email.trim().toLowerCase(); // normalize

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User with this email not found" });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Remove any old OTPs for this email
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({ email, otp, expiresAt });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for CaloTrack Login",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("sendOtp error:", error);
    res.status(500).json({ error: "Server error sending OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    email = email.trim().toLowerCase(); // normalize

    const record = await Otp.findOne({ email });
    if (!record) return res.status(400).json({ error: "No OTP requested for this email" });

    if (Date.now() > record.expiresAt.getTime()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ error: "OTP expired" });
    }

    if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

    // OTP verified → remove it
    await Otp.deleteOne({ email });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const token = generateToken(user._id);

    res.json({ token, user });
  } catch (error) {
    console.error("verifyOtp error:", error);
    res.status(500).json({ error: "Server error verifying OTP" });
  }
};

// Reset password after OTP verified (optional)
// You can call this if your flow requires password reset after OTP verification
exports.sendForgotPasswordOtp = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User with this email not found" });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP in a different collection/table for forgot password
    await Otp.deleteMany({ email, type: "forgot-password" });
    await Otp.create({ email, otp, expiresAt, type: "forgot-password" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "CaloTrack Password Reset OTP",
      text: `Your password reset OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("sendForgotPasswordOtp error:", error);
    res.status(500).json({ error: "Server error sending forgot password OTP" });
  }
};

// Verify Forgot Password OTP
exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    email = email.trim().toLowerCase();

    const record = await Otp.findOne({ email, type: "forgot-password" });
    if (!record) return res.status(400).json({ error: "No OTP requested for this email" });

    if (Date.now() > record.expiresAt.getTime()) {
      await Otp.deleteOne({ email, type: "forgot-password" });
      return res.status(400).json({ error: "OTP expired" });
    }

    if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

    await Otp.deleteOne({ email, type: "forgot-password" });

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyForgotPasswordOtp error:", error);
    res.status(500).json({ error: "Server error verifying forgot password OTP" });
  }
};

// Reset password after OTP verification
exports.resetPasswordAfterOtp = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ error: "Email and new password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("resetPasswordAfterOtp error:", error);
    res.status(500).json({ error: "Server error resetting password" });
  }
};

// Signup function
exports.signup = async (req, res) => {
  try {
    const { name, gender, age, phone, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      gender,
      age,
      phone,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Your existing Google login function
exports.googleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ message: "Access token required" });
    }

    // Fetch user info from Google API using access token
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { email, name, picture } = response.data;

    if (!email || !name) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        picture,
        isGoogleAccount: true,
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Google login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server error during Google login" });
  }
};
