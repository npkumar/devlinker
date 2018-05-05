const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    message: 'Users!'
  });
});

// @route  POST api/users/register
// @desc   Register User
// @access Public
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;

  User.findOne({
    emai: req.body.mail
  })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'Email already taken!' });
      }

      // Set up gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // Encrypt Password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }

        // Hash provided password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          // Use the hashed password
          password = hash;      
          const newUser = new User({
            name, email, avatar, password
          });

          newUser.save()
            .then(user => {
              return res.json(user);
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({ message: 'Internal Error '});
            });
        })
      })
    })
});

module.exports = router;