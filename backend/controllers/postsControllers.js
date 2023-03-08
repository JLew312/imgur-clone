const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostImg = require('../models/postImgModel');


// @desc    Create/Return new post
// @route   POST api/posts
// @access  Public
const createPost = asyncHandler(async (req, res) => {
  const { title, url, description } = req.body;
  const user = await User.findById(req.user.id);

  if (!title || !url) {
    res.status(400);
    throw new Error("Please add all required fields.");
  }

  const newPost = await Post.create({
    user: user.id,
    title
  })

  const poster = await User.findById(newPost.user._id)

  const myPost = await Post.findById(newPost._id);
  const postImg = await PostImg.create({
    post: myPost,
    url,
    description
  })

  if (newPost) {
    res.status(201).json({
      _id: newPost.id,
      posterId: poster.id,
      poster: poster.username,
      title: newPost.title,
      image: postImg.url,
      description: postImg.description,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
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
  const postImg = await PostImg.findOne({post});

  if (post) {
    res.status(200).json({
      id: post._id,
      posterId: poster._id,
      poster: poster.username,
      title: post.title,
      image: postImg.url,
      description: postImg.description
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
  const images = await PostImg.find();

  let imgInfo = [];
  images.forEach(async image => {

    posts.forEach(async post => {

      if ((post._id).valueOf() === (image.post).valueOf()) {
        imgInfo.push({
          id: post._id,
          title: post.title,
          image: image.url,
        })
      }
    })
  })

  res.status(200).json({
    imgInfo
  })
})


module.exports = {
  createPost,
  getPostById,
  getAllPosts
}
