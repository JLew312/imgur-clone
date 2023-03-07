const mongoose = require('mongoose');
// const { post } = require('../routes');

const postImgSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  url: {
    type: String,
    required: true
  },
  preview: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('PostImg', postImgSchema);
