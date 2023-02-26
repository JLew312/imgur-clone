const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register a new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('New user registered');
})

// @desc    Authenticated and login user
// @route   POST api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('User logged in');
})

// @desc    View user info
// @route   POST api/users
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.send('Now viewing your data');
})

module.exports = {
  registerUser,
  loginUser,
  getUser
}
