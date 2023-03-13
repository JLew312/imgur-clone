const mongoose = require('mongoose');
// const { repliesSchema } = require('./repliesModel');

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  depth: {
    type: Number,
    default: 1
},
  text: {
    type: String,
    required: [true, 'Please type comment']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);
