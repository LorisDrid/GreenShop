// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('../database');
const usersRouter = require('./users');
const User = require('../models/user');

router.use(cookieParser());


// Méthode de validation du token
router.post('/validate-token', (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }
  
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Si le token est invalide, essayer de rafraîchir le token
        refreshToken(req, res);
      } else {
        // Si le token est valide, renvoyer un succès avec un message
        res.status(200).json({ message: 'Token is valid' });
      }
    });
});
// Route d'inscription (sign up)
router.post('/signup', async (req, res) => {
  const { email, phoneNumber, password, role, adminSecret } = req.body;

  if (!['seller', 'buyer', 'administrator'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (role === 'administrator' && adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Invalid admin secret' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    };
    req.body = newUser;
    await usersRouter.createUser(req, res);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await connectToDatabase();
        const db = client.db('greenshop_database');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Création du token d'accès
        const accessToken = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '3m' // Durée de validité du token d'accès
        });

        // Création du token de rafraîchissement
        const refreshToken = jwt.sign({
            userId: user._id,
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d' // Durée de validité du token de rafraîchissement
        });

        // Assigner le token de rafraîchissement dans un cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        
        // Envoi du token d'accès dans la réponse
        res.json({ accessToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fonction pour rafraîchir le token
function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        } else {
            // Si le token de rafraîchissement est valide, générer un nouveau token d'accès
            const accessToken = jwt.sign({
                username: decoded.username, // Utilisez les informations du token de rafraîchissement
                email: decoded.email
            }, process.env.JWT_SECRET, {
                expiresIn: '3m'
            });
            res.json({ accessToken, message: 'Token refreshed successfully' });
        }
    });
}

module.exports = router;