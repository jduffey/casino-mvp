const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');
const WagerType = require('../models/WagerType');

// Reset a single collection
router.post('/resetCollection', async (req, res) => {
  const { collectionName } = req.body;
  let Model;

  switch (collectionName) {
    case 'deposits':
      Model = Deposit;
      break;
    case 'wagerTypes':
      Model = WagerType;
      break;
    default:
      return res.status(400).json({ error: 'Invalid collection name' });
  }

  try {
    await Model.deleteMany({});
    res.status(200).json({ message: `${collectionName} collection reset successfully` });
  } catch (error) {
    res.status(500).json({ error: `Error resetting ${collectionName} collection` });
  }
});

// Reset all collections
router.post('/resetAllCollections', async (req, res) => {
  try {
    await Promise.all([
      Deposit.deleteMany({}),
      WagerType.deleteMany({})
    ]);
    res.status(200).json({ message: 'All collections reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting all collections' });
  }
});

module.exports = router;
