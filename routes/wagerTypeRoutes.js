const express = require('express');
const router = express.Router();
const WagerType = require('../models/WagerType');

router.post('/register', async (req, res) => {
  try {
    const { betId, numPossibleOutcomes, winningOutcomes, payoutMultiple } = req.body;

    // Calculate house edge
    const houseEdge =
      1 - (winningOutcomes.length * (payoutMultiple + 1)) / numPossibleOutcomes;

    const wagerType = new WagerType({
      betId,
      numPossibleOutcomes,
      winningOutcomes,
      payoutMultiple,
      houseEdge,
    });

    await wagerType.save();
    res.status(201).json(wagerType);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the wager type.' });
  }
});

module.exports = router;