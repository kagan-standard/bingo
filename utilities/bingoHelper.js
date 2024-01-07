const WorldEvent = require('../models/WorldEvent');
const BingoCard = require('../models/BingoCard');

async function getRandomWorldEvents(count) {
  const allEvents = await WorldEvent.find();
  const shuffled = allEvents.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count - 1); // Fetch one less for the free space
}

async function generateBingoCardForUser(userId) {
  try {
    const events = await getRandomWorldEvents(24); // 24 for a 5x5 card with a free space
    let squares = events.map(event => ({ event: event._id, marked: false }));

    // Insert a free space in the center (position 12 in a 0-indexed array for a 5x5 grid)
    squares.splice(12, 0, { event: null, marked: true, isFreeSpace: true });

    const newBingoCard = new BingoCard({ user: userId, squares });
    await newBingoCard.save();
    return newBingoCard;
  } catch (err) {
    console.error('Error generating bingo card:', err);
    throw err;
  }
}

module.exports = { generateBingoCardForUser };
