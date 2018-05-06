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

// @route  POST api/profile
// @desc   Create or Update User profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profile = {};
  profile.user = req.user.id;
  const {
    handle, company, website, location, bio, status, githubUsername,
    skills,
    youtube, twitter, facebook, linkedin, github,
  } = req.body;

  if (handle) { profile.handle = handle; }
  if (company) { profile.company = company; }
  if (website) { profile.website = website; }
  if (location) { profile.location = location; }
  if (bio) { profile.bio = bio; }
  if (status) { profile.status = status; }
  if (githubUsername) { profile.githubUsername = githubUsername; }

  // Skills
  if (skills) {
    profile.skills = skills.split(',');
  }

  // Social
  profile.social = {};
  if (youtube) { profile.social.youtube = youtube; }
  if (twitter) { profile.social.twitter = twitter; }
  if (facebook) { profile.social.youtube = facebook; }
  if (linkedin) { profile.social.youtube = linkedin; }
  if (github) { profile.social.github = github; }

  Profile.findOne({ user: req.user.id })
    .then((existingProfile) => {
      if (existingProfile) {
        // update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profile }, { new: true })
          .then(updatedProfile => res.json(updatedProfile));
      } else {
        // create
        // check for handle first
        const errors = {};
        Profile.findOne({ handle: profile.handle })
          .then((profileWithExistingHandle) => {
            if (profileWithExistingHandle) {
              errors.handle = 'Handle alreay exists!';
              return res.status(400).json(errors);
            }

            // save profile
            return new Profile(profile)
              .save()
              .then(newProfile => res.json(newProfile));
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
