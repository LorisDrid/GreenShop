const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // Importer le modèle Order

// Créer une nouvelle commande
router.post("/", async (req, res) => {
  const { userId, items, totalPrice, shippingAddress } = req.body;

  if (
    !userId ||
    !Array.isArray(items) ||
    items.length === 0 ||
    isNaN(totalPrice) ||
    !shippingAddress
  ) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const newOrder = new Order({
      user: userId,
      items,
      totalPrice: parseFloat(totalPrice),
      shippingAddress,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer toutes les commandes
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.itemId");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer une commande par ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate("user")
      .populate("items.itemId");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mettre à jour une commande par ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { items, totalPrice, shippingAddress } = req.body;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    isNaN(totalPrice) ||
    !shippingAddress
  ) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const updatedOrder = {
      items,
      totalPrice: parseFloat(totalPrice),
      shippingAddress,
    };

    const order = await Order.findByIdAndUpdate(id, updatedOrder, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Supprimer une commande par ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
