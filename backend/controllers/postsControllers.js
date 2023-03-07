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


  // WHY DOESN'T THIS WORK???
  let imageInfo = [];
  images.forEach(image => {
    imageInfo.push({
      post: image.post,
      image: image.url
    })
  })

  let withTitles = [];
  imageInfo.forEach(async image => {
    let title = await Post.findById(image.post);

    withTitles.push({
      image: image.url,
      title: title
    });
  })

  // let allPosts = [];
  // for (let i = 0; i < images.length; i++) {
  //   let image = images[i];

  //   for (let j = i + 1; j < posts.length; j++) {
  //     let post = posts[j];

  //     if (image.post === post._id) {
  //       allPosts.push({
  //         image: image.url,
  //         title: post.title
  //       })
  //     }
  //   }
  // }

  res.status(200).json({
    posts: withTitles
  })
})


module.exports = {
  createPost,
  getPostById,
  getAllPosts
}
