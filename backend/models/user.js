// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["seller", "buyer", "administrator"],
    required: true,
  },
  points: { type: Number, default: 0 }, // Nouveau champ
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Liste d'objets Order
});

const User = mongoose.model("User", userSchema);

// Créez la collection user si elle n'existe pas
User.createCollection().then(() => {
  console.log("💾[DB]👫 User collection created !");
});

module.exports = User;
