const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/casino_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(bodyParser.json());

// Placeholder for Routes (to be added later)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// TESTING AREA
const User = require('./models/User');

const testUser = new User({ userId: 1 });
testUser.save().then(() => {
  console.log('Test user saved');
}).catch((err) => {
  console.error('Error saving test user', err);
});

const Deposit = require('./models/Deposit');

const testDeposit = new Deposit({
  depositorId: 1,
  amount: 10000,
  minHouseEdge: 0.0526,
  maxPayoutMultiple: 35,
});
testDeposit.save().then(() => {
  console.log('Test deposit saved');
}).catch((err) => {
  console.error('Error saving test deposit', err);
});

const WagerType = require('./models/WagerType');

const testWagerType = new WagerType({
  betId: 'AmericanRoulette_SingleNumber_17',
  numPossibleOutcomes: 38,
  winningOutcomes: [17],
  payoutMultiple: 35,
  houseEdge: 1 - ((1 * (35 + 1)) / 38),
});
testWagerType.save().then(() => {
  console.log('Test wager type saved');
}).catch((err) => {
  console.error('Error saving test wager type', err);
});

module.exports = app; // Exporting app for testing
