const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

const formatUserResponse = (user, token) => ({
  _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage,
  authProvider: user.authProvider, subscriptionStatus: user.subscriptionStatus, token,
});

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400); throw new Error(errors.array().map((e) => e.msg).join(', ')); }
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) { res.status(400); throw new Error('User already exists with this email'); }
    const user = await User.create({ name, email, password, authProvider: 'local' });
    res.status(201).json(formatUserResponse(user, generateToken(user._id)));
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { res.status(400); throw new Error('Please provide email and password'); }
    const user = await User.findOne({ email }).select('+password');
    if (!user || user.authProvider !== 'local') { res.status(401); throw new Error('Invalid email or password'); }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) { res.status(401); throw new Error('Invalid email or password'); }
    res.json(formatUserResponse(user, generateToken(user._id)));
  } catch (error) { next(error); }
};

const googleAuth = async (req, res, next) => {
  try {
    const { name, email, profileImage } = req.body;
    if (!email) { res.status(400); throw new Error('Email is required for Google authentication'); }
    let user = await User.findOne({ email });
    if (user) {
      if (profileImage && !user.profileImage) { user.profileImage = profileImage; await user.save(); }
    } else {
      user = await User.create({ name: name || email.split('@')[0], email, profileImage: profileImage || '', authProvider: 'google' });
    }
    res.json(formatUserResponse(user, generateToken(user._id)));
  } catch (error) { next(error); }
};

const guestLogin = async (req, res, next) => {
  try {
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user = await User.create({ name: 'Guest User', email: `${guestId}@guest.local`, authProvider: 'guest' });
    res.status(201).json(formatUserResponse(user, generateToken(user._id)));
  } catch (error) { next(error); }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) { res.status(404); throw new Error('User not found'); }
    res.json({ _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, authProvider: user.authProvider, subscriptionStatus: user.subscriptionStatus, createdAt: user.createdAt });
  } catch (error) { next(error); }
};

module.exports = { register, login, googleAuth, guestLogin, getMe };
