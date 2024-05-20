const express = require('express');
const { connectToDatabase } = require('./database');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Importez et utilisez le routeur des utilisateurs
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});