import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import "./config/passport.js";
import agentRoutes from "./routes/agentRoutes.js";
import flowRoutes from "./routes/flowRoutes.js";

const app = express();

const FRONTEND_ORIGIN = "https://magbrainai-frontend.vercel.app";

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));
// app.options('*', cors({
//   origin: FRONTEND_ORIGIN,
//   credentials: true,
// }));

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "TOPSECRETWORD",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/flows", flowRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app; // Export the app for testing purposes