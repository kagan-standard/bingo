const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const BingoCard = require('../models/BingoCard');

// GET endpoint to get the logged-in user's bingo card
router.get('/myBingoCard', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token
    const bingoCard = await BingoCard.findOne({ user: userId });

    if (!bingoCard) {
      return res.status(404).send('Bingo card not found');
    }

    res.json(bingoCard);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
