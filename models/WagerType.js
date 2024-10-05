const mongoose = require('mongoose');

const WagerTypeSchema = new mongoose.Schema({
  betId: String,
  numPossibleOutcomes: Number,
  winningOutcomes: [Number],
  payoutMultiple: Number,
  houseEdge: Number,
});

module.exports = mongoose.model('WagerType', WagerTypeSchema);