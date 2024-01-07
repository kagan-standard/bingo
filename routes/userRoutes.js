const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateBingoCardForUser } = require('../utilities/bingoHelper');
const verifyToken = require('../middleware/auth');
const BingoCard = require('../models/BingoCard');
const WorldEvent = require('../models/WorldEvent');
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword
    });

    await newUser.save();

    // Generate a bingo card for the new user
    const newUserBingoCard = await generateBingoCardForUser(newUser._id);


    // Exclude the password from the response
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      // Include other fields as necessary, but exclude the password
    };

    res.status(201).json({
      message: 'User created',
      user: userResponse, // Optionally include user info
      bingoCard: newUserBingoCard // Include the newly created bingo card
    });

  } catch (err) {
    console.error('Error in user registration:', err);
    res.status(500).send('Error creating the user');
  }
});

// POST endpoint for user login
router.post('/login', async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Log the JWT secret for debugging
    console.log("JWT Secret:", process.env.JWT_SECRET);

    // Create a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '100h' });

    // Fetch user's bingo card
    const bingoCard = await BingoCard.findOne({ user: user._id });

    // Fetch world events
    const worldEvents = await WorldEvent.find();

    // Update bingo card based on occurred events
    bingoCard.squares.forEach(square => {
      if (square.event) {
        const event = worldEvents.find(e => e._id.equals(square.event));
        if (event && event.occurred) {
          square.marked = true;
        }
      }
    });

    // Save the updated bingo card
    await bingoCard.save();


    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
