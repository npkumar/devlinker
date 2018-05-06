const express = require('express');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../models/User');

// Load Validation
const validateRegisterInput = require('./../../validation/register');
const validateLoginInput = require('./../../validation/login');

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    message: 'Users!',
  });
});

// @route  POST api/users/register
// @desc   Register User
// @access Public
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;
  const { errors } = validateRegisterInput(req.body);

  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Email already taken!' });
      }

      // Set up gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // Encrypt Password
      return bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }

        // Hash provided password
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            throw error;
          }

          // Use the hashed password
          password = hash;
          const newUser = new User({
            name, email, avatar, password,
          });

          return newUser.save()
            .then(newuser => res.json(newuser))
            .catch((_error) => {
              console.log(_error);
              return res.status(500).json({ message: 'Internal Error ' });
            });
        });
      });
    });
});

// @route  POST api/users/login
// @desc   Login User => return JWT
// @access Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors } = validateLoginInput(req.body);

  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  // Find user by email
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      // Compare password provided
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Need to sign token
            const payload = _.pick(user, ['id', 'name', 'avatar']);

            return jwt.sign(
              payload, keys.secretOrKey, { expiresIn: 36000 },
              (err, token) => res.json({
                success: true,
                token: `Bearer ${token}`,
              }),
            );
          }

          return res.status(400).json({ message: 'Incorrect password!' });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const user = _.pick(req.user, ['id', 'name', 'email']);
  res.json(user);
});

module.exports = router;
