import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
// in your server index file where routes are registered
import postLogsRoute from "../routes/postLogs.js"; // adjust path

// 📦 Route Imports
import loginRoute from "../routes/login.js";
import newsRoute from "../routes/news.js";
import announcementsRoute from "../routes/announcement.js";
import eventsRoute from "../routes/events.js";
import healthTipsRouter from "../routes/healthTips.js"; 
import postsRoute from "../routes/posts.js"; 
import addUserRoute from "../routes/add_user.js"; 
import jobsRoute from "../routes/jobs.js";
import mediaRoute from "../routes/media.js"; 
import pageViewsRoute from "../routes/pageViews.js";
import layoutRoute from "../routes/layout.js";
import serviceRoute from "../routes/services.js";
import aboutRoute from "../routes/about.js";
import contactRoute from "../routes/contact.js";
import doctorsVisibilityRouter from "../routes/doctorsVisibility.js";
import chatbotGeminiRoute from "../routes/chatbot_Gemini.js";

dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads globally
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/uploads/announcements", express.static(path.join(process.cwd(), "uploads/announcements")));
app.use("/uploads/news", express.static(path.join(process.cwd(), "uploads/news")));
app.use("/uploads/health_tips", express.static(path.join(process.cwd(), "uploads/health_tips")));

// Routes
app.use("/api/login", loginRoute);
app.use("/api/news", newsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/announcements", announcementsRoute);
app.use("/api/health-tips", healthTipsRouter); 
app.use("/api/posts", postsRoute);
app.use("/api/users", addUserRoute);
app.use("/api/media", mediaRoute);
app.use("/api/track", pageViewsRoute);
app.use("/api/layout", layoutRoute);
app.use("/api/services", serviceRoute);
app.use("/api/about", aboutRoute);
app.use("/api/post-logs", postLogsRoute);
app.use("/api/contact", contactRoute);
app.use("/api/doctors", doctorsVisibilityRouter);


// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend working perfectly!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let currentLayout = 'modern'; // Change this line

app.get('/api/layout', (req, res) => {
  res.json({ layout: currentLayout });
});

// Add POST endpoint to switch layouts
app.post('/api/layout', (req, res) => {
  const { layout } = req.body;
  if (layout === 'classic' || layout === 'modern') {
    currentLayout = layout;
    res.json({ success: true, layout: currentLayout });
  } else {
    res.status(400).json({ error: 'Invalid layout' });
  }
});

