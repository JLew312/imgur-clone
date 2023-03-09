const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const PostImg = require('../models/postImgModel');
const Comment = require('../models/commentsModel');
const Favorite = require('../models/favoriteModel');


// @desc    Register a new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, about } = req.body;

  if (!username || ! email || !password) {
    res.status(400);
    throw new Error("Please add all required fields.");
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // hash password to store in db
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create the user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    about
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      about: user.about,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
})


// @desc    Authenticated and login user
// @route   POST api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
})


// @desc    View user info
// @route   GET api/users/:id
// @access  Private
const getUserInfo = asyncHandler(async (req, res) => {
  const { _id, username, email, about } = await User.findById(req.params.id);

  res.status(200).json({
    id: _id,
    username,
    email,
    about
  })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'});
}


// @desc    View user posts
// @route   POST api/users/:id/posts
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({ user: user._id });
  const images = await PostImg.find();


  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  let imgInfo = [];
  images.forEach(async image => {

    posts.forEach(async post => {

      if ((post._id).valueOf() === (image.post).valueOf()) {

        imgInfo.push({
          id: post._id,
          title: post.title,
          image: image.image,
        })
      }
    })
  })
  res.status(200).json({
    userId: user._id,
    username: user.username,
    posts: imgInfo
  })
})


// @desc    View user comments
// @route   POST api/users/:id/comments
// @access  Private
const getUserComments = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const comments = await Comment.find({ user: user._id });


  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    userId: user._id,
    username: user.username,
    comments: comments
  })
})


// @desc    View user comments
// @route   POST api/users/:id/comments
// @access  Private
const getUserFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const favorites = await Favorite.find({ user: user._id });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    userId: user._id,
    username: user.username,
    favorites: favorites
  })
})


module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  getUserPosts,
  getUserComments,
  getUserFavorites
}
