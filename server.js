const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const port = process.env.PORT || 5000;

// DB Configuration
const db = require('./config/keys').mongoURI;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passwort
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.get('/', (req, res) => res.send('NPK!'));

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});