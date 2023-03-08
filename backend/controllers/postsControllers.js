const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostImg = require('../models/postImgModel');
const Comment = require('../models/commentsModel');


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
  const comments = await Comment.find({post})

  if (post) {
    res.status(200).json({
      id: post._id,
      posterId: poster._id,
      poster: poster.username,
      title: post.title,
      image: postImg.url,
      description: postImg.description,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      'total comments': comments.length,
      comments: comments
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
  const comments = await Comment.find()

  let imgInfo = [];
  images.forEach(async image => {

    posts.forEach(async post => {
      // const comments = await Comment.find({post})
      // console.log(comments);

      // let commentsCount = comments.length;

      if ((post._id).valueOf() === (image.post).valueOf()) {

        imgInfo.push({
          id: post._id,
          title: post.title,
          image: image.url,
          // "total comments": commentsCount
        })
      }
    })
  })


  let commentArr = [];
  imgInfo.forEach(updated => {

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];

      if ((updated.id).valueOf() === (comment.post).valueOf()) {
        commentArr.push(comment)
      }
    }
    updated.commentCount = commentArr.length;
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
