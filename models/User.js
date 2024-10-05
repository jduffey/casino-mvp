const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: Number,
});

module.exports = mongoose.model('User', UserSchema);