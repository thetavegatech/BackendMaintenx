const mongoose = require('mongoose');

// Define a User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
  },
  plant: {
    type: String,
  },
});

// Create a User model
const UserNo = mongoose.model('UserNo', userSchema);

module.exports = UserNo;
