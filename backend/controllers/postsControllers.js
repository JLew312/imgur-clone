const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostImg = require('../models/postImgModel');
const Comment = require('../models/commentsModel');


// @desc    Create/Return new post
// @route   POST api/posts
// @access  Public
const createPost = asyncHandler(async (req, res) => {
  const { title, image, description } = req.body;
  const user = await User.findById(req.user.id);

  if (!title || !image) {
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
    image,
    description
  })

  if (newPost) {
    res.status(201).json({
      _id: newPost.id,
      posterId: poster.id,
      poster: poster.username,
      title: newPost.title,
      image: postImg.image,
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
      image: postImg.image,
      description: postImg.description,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      'total comments': comments.length,
      comments: comments
    })
  } else {
    res.status(404);
    throw new Error('Post does not exist');
  }
})


// @desc    Edit post info by id
// @route   PUT api/posts/:id
// @access  Public
const editPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const poster = await User.findById(post.user._id);
  const postImg = await PostImg.findOne({post});
  const comments = await Comment.find({post})

  const { title, image, description } = req.body;

  if (!title || !image) {
    res.json({
      message: 'validation error',
      statusCode: 400,
      errors: {
        title: "Title is required",
        image: "Image is required"
      }
    })
    console.log(post)
  } else {
    if (post) {
      await Post.updateOne({_id: post._id}, req.body);
      res.status(200).json({
        id: post._id,
        posterId: poster._id,
        poster: poster.username,
        title: post.title,
        image: postImg.image,
        description: postImg.description,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        'total comments': comments.length,
        comments: comments
      });
    } else {
      res.status(404);
      throw new Error("Post does not exist");
    }
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

      if ((post._id).valueOf() === (image.post).valueOf()) {

        imgInfo.push({
          id: post._id,
          title: post.title,
          image: image.image,
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

  res.status(200).json(imgInfo)
})


// @desc    Delete a comment
// @route   POST api/posts/:postId/comments/:commentId
// @access  Public
const deletePostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  // const postImg = await PostImg.find({post});
  // const comments = await Comment.find({post});


  if (!post) {
    res.status(400);
    throw new Error("Post couldn't be found.");
  }

  await Post.deleteOne({ _id: post._id });
  await PostImg.deleteMany({ post: post._id });
  await Comment.deleteMany({ post: post._id});

  res.status(200).json({
    message: 'post deleted',
    statusCode: 200
  })
})


module.exports = {
  createPost,
  getPostById,
  editPostById,
  getAllPosts,
  deletePostById
}
