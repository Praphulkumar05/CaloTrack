const express = require("express");
const axios = require("axios");
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

async function askGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const res = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    throw new Error("GeminiFailed");
  }
}

async function askPerplexity(prompt) {
  const url = "https://api.perplexity.ai/chat/completions";
  const headers = {
    Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
    "Content-Type": "application/json",
  };
  const body = {
    model: "sonar",
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const res = await axios.post(url, body, { headers });
    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("Perplexity error:", err.response?.data || err.message);
    throw new Error("PerplexityFailed");
  }
}


router.post("/meal-suggestion", async (req, res) => {
  const { userGoals } = req.body;
  if (!userGoals) return res.status(400).json({ error: "userGoals required" });

  try {
    let reply = await askGemini(userGoals);
    if (!reply) reply = await askPerplexity(userGoals);

    return res.json({ reply, source: reply ? "Gemini" : "Perplexity" });
  } catch (err) {
    return res.status(500).json({ error: "AI services failed" });
  }
});


router.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    let reply = await askGemini(prompt);
    if (!reply) {
      console.log("Gemini returned empty. Falling back to Perplexity.");
      reply = await askPerplexity(prompt);
    }
    return res.json({ reply, source: reply ? "Gemini" : "Perplexity" });
  } catch (err) {
    if (err.message === "GeminiFailed") {
      try {
        const reply = await askPerplexity(prompt);
        return res.json({ reply, source: "Perplexity" });
      } catch {
        return res.status(500).json({ error: "Both AI services failed." });
      }
    }
    return res.status(500).json({ error: "Unexpected error." });
  }
});

module.exports = router;
