import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Message is required." });

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GOOGLE_GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          "prompt": {
            "text": message
          },
          "temperature": 0.7,
          "maxOutputTokens": 256
        }),
      }
    );

    const data = await response.json();

    // Check the structure returned
    if (data?.candidates?.[0]?.output) {
      res.json({ reply: data.candidates[0].output });
    } else {
      console.error("Gemini Invalid Response:", data);
      res.json({ reply: "⚠️ Gemini returned an invalid response." });
    }
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ reply: "⚠️ Gemini is having trouble responding." });
  }
});

export default router;
