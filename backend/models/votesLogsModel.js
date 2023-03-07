const mongoose = require('mongoose');

const votesLogsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  voteType: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
})

module.exports = mongoose.Schema('votesLogs', votesLogsSchema);
