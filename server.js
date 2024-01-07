require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bingoRoutes = require('./routes/bingoRoutes');
const app = express();

const mongoDBUri = "mongodb+srv://admin:bingo2024@cluster0.ubslaz5.mongodb.net/?retryWrites=true&w=majority"; // Replace with your actual connection string

mongoose.connect(mongoDBUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.json());


// Use the user routes
app.use('/user', userRoutes);

app.use('/bingo', bingoRoutes);
// ... rest of your server.js code

app.get('/', (req, res) => {
  res.send('Hello, Bingo App!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));