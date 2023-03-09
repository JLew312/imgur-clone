const asyncHandler = require('express-async-handler');
const PostVote = require('../models/postVoteModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');


function totalVotes (arr) {
  let upvoteArr = [];
  let downvoteArr = [];

  arr.forEach(vote => {
    switch (vote.voteType) {
      case 'up':
        upvoteArr.push(vote);
        break;
      case 'down':
        downvoteArr.push(vote);
        break;
      default:
        throw new Error('Incorrect vote type');
    }
  })
  return upvoteArr.length - downvoteArr.length;
}


// @desc    Upvote a post
// @route   POST api/gallery/:postId/upvote
// @access  Public
const upVotePost = asyncHandler(async (req, res) => {
  let myVote = await PostVote.findOne({ user: req.user._id, post: req.params.id });
  let votes = await PostVote.find({ post: req.params.id });
  const voteCount = totalVotes(votes);

  if (!myVote) {
    await PostVote.create({
      user: req.user._id,
      post: req.params.id,
      voteType: 'up'
    })

    votes = await PostVote.find({ post: req.params.id });
    const newCount = totalVotes(votes);

    res.status(200).json({
      votes: newCount
    })
  } else {
    res.status(200).json({
      votes: voteCount
    })
  }
})

module.exports = {
  upVotePost
}
