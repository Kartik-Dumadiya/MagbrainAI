// routes/auth.js - Authentication routes

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Create token
    const token = user.getSignedJwtToken();

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    
    // Create token
    const token = user.getSignedJwtToken();
    
    res.json({ token });
  })(req, res, next);
});

// @route   GET /api/auth/google
// @desc    Google OAuth authentication
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = req.user.getSignedJwtToken();
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth-success?token=${token}`);
  }
);

// @route   GET /api/auth/github
// @desc    GitHub OAuth authentication
// @access  Public
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @route   GET /api/auth/github/callback
// @desc    GitHub OAuth callback
// @access  Public
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const token = req.user.getSignedJwtToken();
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth-success?token=${token}`);
  }
);

// @route   GET /api/auth/dropbox
// @desc    Dropbox OAuth authentication
// @access  Public
router.get('/dropbox', passport.authenticate('dropbox-oauth2'));

// @route   GET /api/auth/dropbox/callback
// @desc    Dropbox OAuth callback
// @access  Public
router.get(
  '/dropbox/callback',
  passport.authenticate('dropbox-oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    const token = req.user.getSignedJwtToken();
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth-success?token=${token}`);
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

// @route   GET /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Public
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'User logged out' });
});

module.exports = router;