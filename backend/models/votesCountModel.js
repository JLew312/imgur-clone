const mongoose = require('mongoose');

const votesCountSchema = mongoose.Schema({
  votesCount: {
    type: Number
  }
})

module.exports = mongoose.model('votesCount', votesCountSchema);
