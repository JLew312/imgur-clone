const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentsModel');


// @desc    Create a new comment
// @route   POST api/posts/:postId/comments
// @access  Public
const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.postId);
  const parentComment = await Comment.findById(req.params.commentId);

  if (!text) {
    res.status(400);
    throw new Error('Please add text to your comment!');
  }

  if (req.params.commentId) {
    const comment = await Comment.create({
      user: user._id,
      post: null,
      comment: parentComment._id,
      text
    })

    if (comment) {
      res.status(201).json({
        _id: comment._id,
        postId: comment.post,
        commentId: comment.comment,
        poster: user._id,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      });
    }
  } else {
    const comment = await Comment.create({
      user: user._id,
      post: post._id,
      comment: null,
      text
    })

    if (comment) {
      res.status(201).json({
        _id: comment._id,
        postId: comment.post,
        commentId: comment.comment,
        poster: user._id,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      });
    }
  }
})


// @desc    Delete a comment
// @route   POST api/posts/:postId/comments/:commentId
// @access  Public
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(400);
    throw new Error("Comment couldn't be found.");
  }

  await Comment.deleteOne({ _id: req.params.commentId })

  res.status(200).json({
    message: 'comment deleted',
    statusCode: 200
  })
})

module.exports = {
  createComment,
  deleteComment
}
