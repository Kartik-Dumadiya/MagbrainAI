const express = require("express");
const passport = require("passport");
const { signup, login, logout } = require("../controllers/authController");

const router = express.Router();

// Local Signup and Login
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Dropbox OAuth
router.get("/dropbox", passport.authenticate("dropbox"));
router.get(
  "/dropbox/callback",
  passport.authenticate("dropbox", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;