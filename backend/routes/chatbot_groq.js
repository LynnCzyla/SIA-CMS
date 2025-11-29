import express from "express";
import Groq from "groq-sdk";

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// In-memory conversation memory (optional: can be per-user in DB)
const conversationMemory = {};

router.post("/", async (req, res) => {
  const { message, userId } = req.body;

  if (!message) return res.status(400).json({ reply: "Message is required." });
  if (!userId) return res.status(400).json({ reply: "User ID is required." });

  try {
    // Initialize memory for this user
    if (!conversationMemory[userId]) conversationMemory[userId] = [];

    // Add user message to memory
    conversationMemory[userId].push({ sender: "user", text: message });

    // Keep only last 5 messages to save tokens
    const conversationHistory = conversationMemory[userId].slice(-5).map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }));

    // Request to Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are Lunax, a friendly healthcare assistant. Keep replies concise." },
        ...conversationHistory,
      ],
      temperature: 0.6,
    });    

    const reply = completion.choices?.[0]?.message?.content || "No response.";

    // Save bot reply in memory
    conversationMemory[userId].push({ sender: "bot", text: reply });

    res.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ reply: "❌ Lunax server is unavailable." });
  }
});

export default router;
