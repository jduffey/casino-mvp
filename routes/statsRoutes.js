const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

router.get('/', async (req, res) => {
  try {
    const deposits = await Deposit.find({});
    const totalFunds = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
    const totalDeposits = deposits.length;
    console.log(deposits);
    const uniqueDepositors = deposits.reduce((acc, deposit) => {
      if (!acc.includes(deposit.depositorId)) {
        acc.push(deposit.depositorId);
      }
      return acc;
    }, []);
    res.status(200).json({ totalFunds, totalDeposits, uniqueDepositors });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching stats.' });
  }
});

module.exports = router;