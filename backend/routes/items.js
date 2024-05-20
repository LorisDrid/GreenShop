const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../database');
const { ObjectId } = require('mongodb');

// Créer un nouvel item
router.post('/', async (req, res) => {
  const { name, description, price, supplier } = req.body;
  
  if (isNaN(price)) {
    return res.status(400).json({ error: 'Price must be a valid number' });
  }
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('items');
    
    const item = {
      name,
      description,
      price: parseFloat(price),
      supplier,
      rate: 0,
      rateCount: 0
    };
    
    await collection.insertOne(item);
    
    res.status(201).json(item);
    
    client.close();
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer tous les items
router.get('/', async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('items');
    
    const items = await collection.find({}).toArray();
    
    res.json(items);
    
    client.close();
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer un item par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('items');
    
    const item = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
    
    client.close();
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un item par ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, supplier } = req.body;
  
  if (isNaN(price)) {
    return res.status(400).json({ error: 'Price must be a valid number' });
  }
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('items');
    
    const updatedItem = {
      name,
      description,
      price: parseFloat(price),
      supplier
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedItem }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item updated successfully' });
    
    client.close();
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Supprimer un item par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const client = await connectToDatabase();
    const db = client.db('greenshop_database');
    const collection = db.collection('items');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
    
    client.close();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;