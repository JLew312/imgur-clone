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

  let comment;

  if (!req.params.commentId) {
    comment = await Comment.create({
      author: user._id,
      parent: post._id,
      text: text,
    })

  } else {
    comment = await Comment.create({
      author: user._id,
      parent: parentComment._id,
      text: text,
    })

    await Comment.updateOne({_id: parentComment._id}, {$push: {replies: comment}});
  }

  res.status(201).json({
    id: comment._id,
    author: comment.author,
    parents: comment.breadCrumbs,
    content: comment.text
  });
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
