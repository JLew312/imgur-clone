const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: [true, 'Please type comment']
  },
  replies: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);
