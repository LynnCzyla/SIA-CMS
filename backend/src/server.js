// backend/src/server.js
import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";


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
import notificationsRoute from "../routes/notifications.js"; 
import postLogsRoute from "../routes/postLogs.js"; // adjust path
import chatbotGroqRoute from "../routes/chatbot_groq.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve uploads globally
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
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
app.use("/api/notifications", notificationsRoute);


// Test Endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working perfectly!" });
});

// Layout Logic
let currentLayout = "modern";

app.post("/api/layout", (req, res) => {
  const { layout } = req.body;
  
  if (layout === "classic" || layout === "modern") {
    currentLayout = layout;
    return res.json({ success: true, layout: currentLayout });
  }

  res.status(400).json({ error: "Invalid layout" });
});

// Start Server — placed LAST ✔
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});