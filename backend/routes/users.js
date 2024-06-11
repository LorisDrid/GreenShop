// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Créer un nouvel utilisateur
async function createUser(req, res) {
  const { email, phoneNumber, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      email,
      phoneNumber,
      password,
      role,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Récupérer un utilisateur par ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mettre à jour un utilisateur par ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, phoneNumber, password, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      email,
      phoneNumber,
      password,
      role,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  res.json({ message: "User updated successfully" });
});

// Supprimer un utilisateur par ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  router,
  createUser,
};
