const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

  
    const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { email, name, picture } = googleRes.data;

    if (!email) {
      return res.status(400).json({ error: "Google email not found." });
    }

    // 2. Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // 3. If user doesn't exist, create a dummy entry
      user = new User({
        name: name || "Google User",
        gender: "Other",               // Default value
        age: 0,                        // Default value
        phone: `google-${Date.now()}`, // Placeholder phone to ensure uniqueness
        email,
        password: "google-login",     // Dummy password
      });

      await user.save(); // Save new user
    }

    // 4. Create token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Google login error", err);
    res.status(500).json({ error: "Google login failed." });
  }
});

module.exports = router;
