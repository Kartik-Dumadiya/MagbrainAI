import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, import.meta.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // do not expose hash
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};