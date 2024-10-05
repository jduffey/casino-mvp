const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

router.get('/', async (req, res) => {
  try {
    const deposits = await Deposit.find({});
    const totalFunds = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
    res.status(200).json({ totalFunds });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching stats.' });
  }
});

module.exports = router;