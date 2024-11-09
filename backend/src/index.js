// Import necessary modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Initialize express app
const app = express();

// Database connection
connectDB()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Allow requests from frontend origin
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
  })
);

// Handle CORS preflight requests for all routes
app.options("*", cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "20kb" })); // Limit JSON body size
app.use(express.urlencoded({ extended: true, limit: "20kb" })); // Limit URL-encoded body size

// Serve static files from the "public" directory
app.use(express.static("public"));

// Cookie parser for handling cookies
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import webinarRoutes from "./routes/webinar.routes.js";
import contactUsRoutes from "./routes/contactus.routes.js";

// Set up route handlers
app.use("/api/v4/users", userRouter);
app.use("/api/v4/ai", aiRoutes);
app.use("/api/v4/blogs", blogRoutes);
app.use("/api/v4/comments", commentRoutes);
app.use("/api/v4/likes", likeRoutes);
app.use("/api/v4/webinar", webinarRoutes);
app.use("/api/v4/contactUs", contactUsRoutes);

// Test route to verify server status
app.get("/ping", (req, res) => res.send("Server is running!"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Define server port and start listening
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
