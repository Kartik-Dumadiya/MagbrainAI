import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user);

    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .status(201)
      .json({ message: "User created successfully", user: { name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  req.logout && req.logout();
  res.status(200).json({ message: "Logout successful" });
};

export const oauthSuccess = (req, res) => {
  if (!req.user) {
    return res.redirect("http://localhost:5173/signin?oauth=fail");
  }
  const token = generateToken(req.user);
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
  res.redirect("http://localhost:5173/dashboard?oauth=success");
};