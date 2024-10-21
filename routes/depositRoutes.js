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

router.get('/depositors', async (req, res) => {
  try {
    const depositorStats = await Deposit.aggregate([
      {
        $group: {
          _id: '$depositorId',
          totalDeposited: { $sum: '$amount' }
        }
      },
      {
        $project: {
          depositorId: '$_id',
          totalDeposited: 1,
          _id: 0
        }
      }
    ]);
    res.status(200).json(depositorStats);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching depositors.' });
  }
});

module.exports = router;
