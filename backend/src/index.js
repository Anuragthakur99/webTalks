import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://webtalks-frontend.onrender.com", // For deployed frontend
  "https://webtalks-backend.onrender.com", // Your backend domain (in case needed for the front end)
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins during development or the specific allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin); // Log blocked origins
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware to handle JSON requests and cookie parsing
app.use(
  express.json({
    limit: "50mb", // Increase the limit if you are sending large data
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDB(); // Connect to the database
});
