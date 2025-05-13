// config/passport.js - Passport configuration for authentication strategies

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const DropboxStrategy = require('passport-dropbox-oauth2').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Local Strategy (email/password)
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      
      // If user doesn't exist
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with same email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Update existing user with Google ID
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }
      
      // Create new user
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        avatar: profile.photos[0].value
      });
      
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ githubId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // GitHub may not provide email directly, get from emails array if available
      const email = profile.emails && profile.emails[0].value;
      
      if (email) {
        // Check if user exists with same email
        user = await User.findOne({ email });
        
        if (user) {
          // Update existing user with GitHub ID
          user.githubId = profile.id;
          await user.save();
          return done(null, user);
        }
      }
      
      // Create new user
      user = new User({
        name: profile.displayName || profile.username,
        email: email || `${profile.username}@github.com`,
        githubId: profile.id,
        avatar: profile.photos[0].value
      });
      
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Dropbox OAuth Strategy
passport.use(new DropboxStrategy(
  {
    apiVersion: '2',
    clientID: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    callbackURL: '/api/auth/dropbox/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ dropboxId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with same email
      if (profile.emails && profile.emails[0].value) {
        user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
          // Update existing user with Dropbox ID
          user.dropboxId = profile.id;
          await user.save();
          return done(null, user);
        }
      }
      
      // Create new user
      user = new User({
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : `${profile.id}@dropbox.user`,
        dropboxId: profile.id,
        avatar: profile.photos ? profile.photos[0].value : null
      });
      
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;