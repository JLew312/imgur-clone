const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostImg = require('../models/postImgModel');

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

  const poster = await User.findById(post.user._id)

  if (post) {
    res.status(201).json({
      _id: post.id,
      // this is going to return me current user info
      // NOT the posters info
      posterId: poster.id,
      poster: poster.username,
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


// @desc    Get post info by id
// @route   GET api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const poster = await User.findById(post.user._id);
  // const image = await PostImg.findById()

  if (post) {
    res.status(200).json({
      id: post._id,
      posterId: poster._id,
      poster: poster.username,
      title: post.title,
    })
  } else {
    res.status(400);
    throw new Error('Post does not exist');
  }
})

// @desc    Get all posts
// @route   GET api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({
    posts
  })
})


module.exports = {
  createPost,
  getPostById,
  getAllPosts
}
