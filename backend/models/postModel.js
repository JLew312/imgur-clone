const mongoose = require('mongoose');
// const { commentSchema } = require('./commentsModel');

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add post title']
  },
  // replies: {
  //   type: Array,
  //   default: []
  // }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema);
