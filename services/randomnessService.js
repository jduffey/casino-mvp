const crypto = require('crypto');

function generateRandomNumber(max) {
  const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
  const randomNumber = parseInt(hash.substring(0, 8), 16);
  return randomNumber % max;
}

module.exports = { generateRandomNumber };