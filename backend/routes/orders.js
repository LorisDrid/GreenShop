const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../database');
const { ObjectId } = require('mongodb');

// Créer une nouvelle commande
router.post('/', async (req, res) => {
  const { userId, items, totalPrice, shippingAddress } = req.body;
  
  if (!userId || !Array.isArray(items) || items.length === 0 || isNaN(totalPrice) || !shippingAddress) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('orders');
    
    const order = {
        user: userId,
        items: items.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity
        })),
        totalPrice: parseFloat(totalPrice),
        shippingAddress,
        createdAt: new Date()
    };
    
    await collection.insertOne(order);
    
    res.status(201).json(order);
    
    client.close();
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer toutes les commandes
router.get('/', async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('orders');
    
    const orders = await collection.find({}).toArray();
    
    res.json(orders);
    
    client.close();
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer une commande par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('orders');
    
    const order = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
    
    client.close();
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour une commande par ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { items, totalPrice, shippingAddress } = req.body;
  
  if (!Array.isArray(items) || items.length === 0 || isNaN(totalPrice) || !shippingAddress) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('orders');
    
    const updatedOrder = {
      items,
      totalPrice: parseFloat(totalPrice),
      shippingAddress
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedOrder }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order updated successfully' });
    
    client.close();
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Supprimer une commande par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('orders');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
    
    client.close();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
