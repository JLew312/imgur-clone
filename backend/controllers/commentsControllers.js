const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentsModel');

// @desc    Create/Return new post
// @route   POST api/posts
// @access  Public
const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.postId);

  if (!text) {
    res.status(400);
    throw new Error('Please add text to your comment!');
  }

  const comment = await Comment.create({
    user: user._id,
    post: post._id,
    text
  })

  if (comment) {
    res.status(201).json({
      _id: comment._id,
      postId: comment.post,
      text: comment.text,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    });
  }
})

module.exports = {
  createComment
}
