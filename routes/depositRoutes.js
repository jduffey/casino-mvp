const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

router.post('/', async (req, res) => {
  try {
    const { depositorId, amount, minHouseEdge, maxPayoutMultiple } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than zero.' });
    }

    const deposit = new Deposit({
      depositorId,
      amount,
      minHouseEdge,
      maxPayoutMultiple,
    });

    await deposit.save();
    res.status(201).json(deposit);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the deposit.' });
  }
});

module.exports = router;