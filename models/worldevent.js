const mongoose = require('mongoose');

const worldEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  occurred: {
    type: Boolean,
    default: false
  },
  // You can add a date or other relevant fields if needed
}, { collection: 'WorldEvents' }); // Explicitly setting the collection name

const WorldEvent = mongoose.model('WorldEvent', worldEventSchema);

module.exports = WorldEvent;
