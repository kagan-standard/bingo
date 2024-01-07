const mongoose = require('mongoose');

const bingoCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  squares: [{
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorldEvent'
    },
    marked: {
      type: Boolean,
      default: false
    }
  }],
  // Other fields as necessary
});

const BingoCard = mongoose.model('BingoCard', bingoCardSchema);

module.exports = BingoCard;
