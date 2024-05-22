// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../database');

// Créer un nouvel utilisateur
async function createUser(req, res) {
  const { email, phoneNumber, password, role } = req.body;
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const user = { email, phoneNumber, password, role };
  await collection.insertOne(user);
  res.status(201).json(user);
}

// Autres routes pour récupérer, mettre à jour et supprimer des utilisateurs

router.get('/', async (req, res) => {
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const users = await collection.find({}).toArray();
  res.json(users);
});

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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, phoneNumber, password, role } = req.body;
  const client = await connectToDatabase();
  const db = client.db('greenshop_database');
  const collection = db.collection('users');
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { email, phoneNumber, password, role } }
  );
  if (result.modifiedCount === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ message: 'User updated successfully' });
});

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

module.exports = {
  router,
  createUser,
};
