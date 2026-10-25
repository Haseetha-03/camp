
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./src/config/db");
const { initRealtime } = require("./src/realtime");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const lostRoutes = require("./src/routes/LostFoundRoutes");
const goodsRoutes = require("./src/routes/GoodsRoutes");
const collegeMemoriesRoutes = require("./src/routes/collegeMemoriesRoutes");
const clubsRoutes = require("./src/routes/clubsRoutes");
const placementRoutes = require("./src/routes/placementRoutes");
const canteensRoutes = require("./src/routes/canteensRoute");
const notificationsRoutes = require("./src/routes/notificationsRoutes");
const moderationRoutes = require("./src/routes/moderationRoutes");
const examRoutes = require("./src/routes/ExamRoutes");
const summarizeRoutes = require("./src/routes/summarizeRoutes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/lostitems", lostRoutes);
app.use("/api/goods", goodsRoutes);
app.use("/api/college-memories", collegeMemoriesRoutes);
app.use("/api/clubs", clubsRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/canteens", canteensRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/moderate", moderationRoutes);
app.use("/api", examRoutes);
app.use("/api/summarize", summarizeRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "campus-platform-server",
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Initialize existing realtime service
initRealtime(server);

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
