const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');

// @desc    Create/Return new post
// @route   POST api/posts
// @access  Public
const createPost = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const user = await User.findById(req.user.id);

  if (!title) {
    res.status(400);
    throw new Error("Please add all required fields.");
  }

  const post = await Post.create({
    user: user.id,
    title,
    text
  })

  if (post) {
    res.status(201).json({
      _id: post.id,
      posterId: user.id,
      poster: user.username,
      title: post.title,
      text: post.text,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
})


module.exports = {
  createPost,
}
