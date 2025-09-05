const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Existing auth routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/reset-password", authController.resetPasswordAfterOtp);
router.post("/google", authController.googleLogin);

// New forgot password OTP flow
router.post("/forgot-password", authController.sendForgotPasswordOtp);
router.post("/verify-forgot-otp", authController.verifyForgotPasswordOtp);
router.post("/reset-password-after-otp", authController.resetPasswordAfterOtp);

module.exports = router;
