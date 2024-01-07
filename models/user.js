const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: { // Store the hashed password
    type: String,
    required: true
  },
  // Add other relevant fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
