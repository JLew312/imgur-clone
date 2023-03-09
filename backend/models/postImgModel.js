const mongoose = require('mongoose');

const postImgSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('PostImg', postImgSchema);
