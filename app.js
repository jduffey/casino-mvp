const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/casino_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(bodyParser.json());

// Placeholder for MongoDB connection (to be added later)

// Placeholder for Routes (to be added later)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Area for testing
// In app.js or a separate test file
const User = require('./models/User');

// Create a test user
const testUser = new User({ userId: 1 });
testUser.save().then(() => {
  console.log('Test user saved');
}).catch((err) => {
  console.error('Error saving test user', err);
});



module.exports = app; // Exporting app for testing
