const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentsModel');


// @desc    Create a new comment
// @route   POST api/posts/:postId/comments
// @access  Public
const createReply = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.postId);
  const parentComment = await Comment.findById(req.params.commentId);


  if (!parentComment) {
    const comment = {
      user: user._id,
      post: post._id,
      comment: null,
      text,
    }

    await Comment.create(comment);
    await Post.findOneAndUpdate({_id: req.params.postId}, { $push: { replies: comment }})

    res.status(201).json(post)

  } else {
    const comment = {
      user: user._id,
      post: post._id,
      comment: parentComment._id,
      text,
    }

    await Comment.create(comment);
    const updated = await Comment.findOneAndUpdate({_id: req.params.commentId}, { $push: { replies: comment }})

    res.status(201).json({updated})
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
  createReply,
  deleteComment
}
