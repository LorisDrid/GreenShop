// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["seller", "buyer", "administrator"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Create the user collection
User.createCollection().then(() => {
  console.log("💾[DB] User collection created !");
});

module.exports = User;
