import express from "express";
import passport from "passport";
import { signup, login, logout, oauthSuccess } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/secrets", passport.authenticate("google", { failureRedirect: "http://localhost:5173/signin" }), oauthSuccess);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "http://localhost:5173/signin" }), oauthSuccess);

// router.get("/dropbox", passport.authenticate("dropbox"));
// router.get("/dropbox/callback", passport.authenticate("dropbox", { failureRedirect: "http://localhost:5173/signin" }), oauthSuccess);

export default router;