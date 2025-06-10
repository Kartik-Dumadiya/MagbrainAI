import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import mongoose from "mongoose";

import cors from "cors";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

// Add this BEFORE your routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // allows cookies/session
}));

// Also, parse JSON requests

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // Set to true if using HTTPS
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "users");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });

// app.get("/register", (req, res) => {
//   res.render("register.ejs");
// });

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

function test(req, res, next) {
  console.log('Hello this is middleware testing the POST req for /auth/signin');
  console.log(req.body.email);
  console.log(req.body.password);
  next()
}

app.post("/auth/signin", test, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

// cors
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      const newUser = new User({ email, password: hash });
      await newUser.save();

      // You can generate a JWT here instead of login if using JWT
      res.status(200).json({ message: "User registered successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

passport.use(
  "local",
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async function verify(email, password, cb) {
      console.log("Inside local strategy");
      try {
        const user = await User.findOne({ email });
        if (user) {
          bcrypt.compare(password, user.password, (err, valid, invalid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            }
            if (invalid) {
              console.log("Invalid password");
              return cb(null, false);
            }
            if (valid) {
              console.log("User authenticated successfully");

              return cb(null, user);
            }
            
            return cb(null, false);
          });
        } else {
          return cb(null, false);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.VITE_API_URL || "http://localhost:3000"}/auth/google/secrets`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        let user = await User.findOne({ email: profile.email });
        if (!user) {
          user = new User({ email: profile.email, password: "google" });
          await user.save();
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
