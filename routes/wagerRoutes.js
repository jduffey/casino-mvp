const express = require('express');
const router = express.Router();
const { placeWager } = require('../services/wagerService');

router.post('/', async (req, res) => {
  try {
    const { userId, betId, wagerAmount } = req.body;

    if (wagerAmount <= 0) {
      return res.status(400).json({ error: 'Invalid wager amount. Amount must be greater than zero.' });
    }

    const wager = await placeWager(userId, betId, wagerAmount);

    res.status(201).json(wager);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;