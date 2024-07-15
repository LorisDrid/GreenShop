const express = require("express");
const router = express.Router();
const Item = require("../models/item"); // Importer le modèle Item

// Créer un nouvel item
router.post("/", async (req, res) => {
  const { name, description, price, supplier } = req.body;

  if (isNaN(price)) {
    return res.status(400).json({ error: "Price must be a valid number" });
  }

  try {
    const newItem = new Item({
      name,
      description,
      price: parseFloat(price),
      supplier,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer tous les items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("labels");
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer un item par ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id).populate("labels");

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mettre à jour un item par ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, supplier } = req.body;

  if (isNaN(price)) {
    return res.status(400).json({ error: "Price must be a valid number" });
  }

  try {
    const updatedItem = {
      name,
      description,
      price: parseFloat(price),
      supplier,
    };

    const item = await Item.findByIdAndUpdate(id, updatedItem, { new: true });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Supprimer un item par ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
