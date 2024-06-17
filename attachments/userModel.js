// // User.js

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String, // Hashed password will be stored
//   // Other user fields
// });

// // Compare the provided password with the stored hashed password
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('UserInfo', userSchema);
