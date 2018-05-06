const express = require('express');

const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Modals
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile/test
// @desc   Test profile route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    message: 'Profile!',
  });
});

// @route  GET api/profile
// @desc   Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'No User Profile found!';
        return res.status(400).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
