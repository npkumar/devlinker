const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// DB Configuration
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('NPK!'));

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});