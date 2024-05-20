const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../database');

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
  const { email, phoneNumber, password } = req.body;
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const user = { email, phoneNumber, password };
  await collection.insertOne(user);
  res.status(201).json(user);
});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const users = await collection.find({}).toArray();
  res.json(users);
});

// Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const user = await collection.findOne({ _id: new ObjectId(id) });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, phoneNumber, password } = req.body;
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { email, phoneNumber, password } }
  );
  if (result.modifiedCount === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ message: 'User updated successfully' });
});

// Supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;