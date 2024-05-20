const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

async function connectToDatabase() {
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
  return client;
}

module.exports = { connectToDatabase };