const mongoose = require('mongoose');

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
  text: {
    type: String
  },
  // views: {
  //   type: Number,
  //   required: true
  // },
  // votes: {
  //   type: Number,
  //   required: true
  // }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema);
