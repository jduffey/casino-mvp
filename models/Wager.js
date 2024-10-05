const mongoose = require('mongoose');

const WagerSchema = new mongoose.Schema({
  userId: Number,
  betId: String,
  wagerAmount: Number,
  outcome: {
    result: Number,
    isWin: Boolean,
    payout: Number,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wager', WagerSchema);