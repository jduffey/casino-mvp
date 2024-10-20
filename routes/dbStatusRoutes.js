const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const isConnected = dbState === mongoose.ConnectionStates.connected;

  let collections = [];
  if (isConnected) {
    collections = await mongoose.connection.db.listCollections().toArray();
    collections = collections.map(col => col.name);
  }

  res.status(200).json({
    isConnected,
    dbName: mongoose.connection.name,
    url: mongoose.connection.host,
    port: mongoose.connection.port,
    collections: collections,
  });
});

module.exports = router;
