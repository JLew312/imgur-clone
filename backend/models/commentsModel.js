const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Please type comment']
  }
}, {
  timestamps: true
})

module.exports = mongoose.Model('Comment', commentSchema);
