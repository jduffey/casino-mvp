const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
  depositorId: Number,
  amount: Number,
  minHouseEdge: Number,
  maxPayoutMultiple: Number,
});

module.exports = mongoose.model('Deposit', DepositSchema);