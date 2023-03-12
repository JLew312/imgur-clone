const mongoose = require('mongoose');

const repliesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  text: {
    type: String,
    required: [true, 'Please type comment']
  },
  // replies: [repliesSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model("Replies", repliesSchema);
