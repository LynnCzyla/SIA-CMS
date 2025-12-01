import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to fetch services from your API
async function fetchServices() {
  try {
    const response = await axios.get(`http://localhost:${process.env.PORT || 5000}/api/services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Function to fetch contact info from your API
async function fetchContactInfo() {
  try {
    const response = await axios.get(`http://localhost:${process.env.PORT || 5000}/api/contact`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
}

router.post("/", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // Fetch data from your database via your existing API routes
    const services = await fetchServices();
    const contactInfo = await fetchContactInfo();

    // Get only published services
    const publishedServices = services.filter(service => service.status === 'published');
    
    // Format service names
    const serviceNames = publishedServices
      .map(service => service.short_title || service.full_title)
      .filter(name => name && name.trim() !== '')
      .join(', ');

    // Format contact info
    const contact = Array.isArray(contactInfo) ? contactInfo[0] : contactInfo;

    // Prepare STRICT system message
    const systemMessage = {
      role: "system",
      content: `You are Lunax, a friendly healthcare assistant at a hospital.

YOUR ROLE: Only answer questions related to:
1. Healthcare services
2. Medical advice (general only)
3. Hospital information
4. Contact details
5. Health tips and wellness

DATABASE INFORMATION:
Available Services: ${serviceNames || 'Currently no services available'}
Contact Email: ${contact?.email || 'Not available'}
Hospital Address: ${contact?.hospital_address || 'Not available'}
Phone: ${contact?.telephone || 'Not available'}

STRICT RULES:
1. ONLY answer healthcare/hospital related questions
2. If asked about math, jokes, weather, politics, sports, or any non-health topic, politely decline
3. Response for off-topic questions: "I'm here to help with healthcare and hospital-related questions. Is there anything medical or hospital-related I can assist you with?"
4. Keep answers concise (1-2 sentences maximum)
5. For service questions: Only mention services from the list above

Examples:
- User: "What services do you offer?" → List services from database
- User: "What's your email?" → Give email from database
- User: "1 + 1?" → "I'm here to help with healthcare questions..."
- User: "Tell me a joke" → "I'm here to help with healthcare questions..."
- User: "Headache advice?" → Give general advice
`
    };

    // Request to Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        systemMessage,
        ...conversationHistory,
        { role: "user", content: message }
      ],
      temperature: 0.3, // Low temperature for strict adherencevfvdfvdfvdfvdfvdfvdfvdf
      max_tokens: 100,
    });

    const reply = completion.choices[0]?.message?.content || "I'm here to help with healthcare questions.";

    res.json({ reply });

  } catch (error) {
    console.error("Error in chatbot:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;