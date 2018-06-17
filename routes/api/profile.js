const express = require('express');

const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

// Modals
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Load Validation
const validateProfileInput = require('./../../validation/profile');
const validateExperienceInput = require('./../../validation/experience');
const validateEducationInput = require('./../../validation/education');
const validatePublicationInput = require('./../../validation/publication');
const validateAwardInput = require('./../../validation/award');
const validateCertificationInput = require('./../../validation/certification');

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
    .populate('user', ['name', 'avatar'])
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
  // Validation
  const { errors } = validateProfileInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

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
    profile.skills = skills.split(',').map(skill => skill.trim());
  }

  // Social
  profile.social = {};
  if (youtube) { profile.social.youtube = youtube; }
  if (twitter) { profile.social.twitter = twitter; }
  if (facebook) { profile.social.facebook = facebook; }
  if (linkedin) { profile.social.linkedin = linkedin; }
  if (github) { profile.social.github = github; }

  return Profile.findOne({ user: req.user.id })
    .then((existingProfile) => {
      if (existingProfile) {
        // update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profile }, { new: true })
          .then(updatedProfile => res.json(updatedProfile));
      } else {
        // create
        // check for handle first
        const err = {};
        Profile.findOne({ handle: profile.handle })
          .then((profileWithExistingHandle) => {
            if (profileWithExistingHandle) {
              err.handle = 'Handle alreay exists!';
              return res.status(400).json(err);
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

// @route  GET api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => res.json(profiles))
    .catch(() => res.status(500).json({ message: 'Internal Error' }));
});

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  return Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'Not Profile found';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(() => res.status(404).json({ message: 'Profile not found' }));
});

// @route  GET api/profile/user/:id
// @desc   Get profile by id
// @access Public
router.get('/user/:id', (req, res) => {
  const errors = {};
  return Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'Not Profile found';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(() => res.status(404).json({ message: 'Profile not found' }));
});

// @route  POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors } = validateExperienceInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newExperience = _.pick(req.body, [
        'title', 'company', 'location', 'from', 'to', 'current', 'description',
      ]);

      // Add to beginning of list of experiences
      profile.experience.unshift(newExperience);
      profile
        .save()
        .then(p => res.json(p));
    })
    .catch(() => res.status(500).json({ message: 'Internal Error' }));
});

// @route  POST api/profile/education
// @desc   Add education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors } = validateEducationInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newEducation = _.pick(req.body, [
        'school', 'degree', 'fieldOfStudy', 'from', 'to', 'current', 'description',
      ]);

      // Add to beginning of list of education
      profile.education.unshift(newEducation);
      profile
        .save()
        .then(p => res.json(p));
    })
    .catch(() => res.status(500).json({ message: 'Internal Error' }));
});

// @route  POST api/profile/publication
// @desc   Add publication to profile
// @access Private
router.post('/publication', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors } = validatePublicationInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newPublication = _.pick(req.body, [
        'title', 'description', 'date',
      ]);

      // Add to beginning of list of publications
      profile.publication.unshift(newPublication);
      profile
        .save()
        .then(p => res.json(p));
    })
    .catch(() => res.status(500).json({ message: 'Internal Error' }));
});

// @route  POST api/profile/award
// @desc   Add award to profile
// @access Private
router.post('/award', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors } = validateAwardInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newAward = _.pick(req.body, [
        'title', 'description', 'date',
      ]);

      // Add to beginning of list of awards
      profile.award.unshift(newAward);
      profile
        .save()
        .then(p => res.json(p));
    })
    .catch(() => res.status(500).json({ message: 'Internal Error' }));
});

// @route  POST api/profile/certification
// @desc   Add certification to profile
// @access Private
router.post('/certification', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors } = validateCertificationInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newCertification = _.pick(req.body, [
        'title', 'description', 'date',
      ]);

      // Add to beginning of list of certifications
      profile.certification.unshift(newCertification);
      profile
        .save()
        .then(p => res.json(p));
    })
    .catch(() => res.status(500).json({ message: 'Internal Error' }));
});

// @route  DELETE api/profile/experience/:id
// @desc   Delete an experience
// @access Private
router.delete('/experience/:id', passport.authenticate('jwt', { session: false }), (req, res) => Profile.findOne({ user: req.user.id })
  .then((profile) => {
    const index = _.findIndex(profile.experience, exp => exp.id === req.params.id);
    if (index > -1) {
      profile.experience.splice(index, 1);
    }

    profile
      .save()
      .then(p => res.json(p));
  })
  .catch(err => res.status(404).json(err)));

// @route  DELETE api/profile/education/:id
// @desc   Delete an education
// @access Private
router.delete('/education/:id', passport.authenticate('jwt', { session: false }), (req, res) => Profile.findOne({ user: req.user.id })
  .then((profile) => {
    const index = _.findIndex(profile.education, exp => exp.id === req.params.id);
    if (index > -1) {
      profile.education.splice(index, 1);
    }

    profile
      .save()
      .then(p => res.json(p));
  })
  .catch(err => res.status(404).json(err)));

// @route  DELETE api/profile/award/:id
// @desc   Delete an award
// @access Private
router.delete('/award/:id', passport.authenticate('jwt', { session: false }), (req, res) => Profile.findOne({ user: req.user.id })
  .then((profile) => {
    const index = _.findIndex(profile.award, exp => exp.id === req.params.id);
    if (index > -1) {
      profile.award.splice(index, 1);
    }

    profile
      .save()
      .then(p => res.json(p));
  })
  .catch(err => res.status(404).json(err)));

// @route  DELETE api/profile/certification/:id
// @desc   Delete a certification
// @access Private
router.delete('/certification/:id', passport.authenticate('jwt', { session: false }), (req, res) => Profile.findOne({ user: req.user.id })
  .then((profile) => {
    const index = _.findIndex(profile.certification, exp => exp.id === req.params.id);
    if (index > -1) {
      profile.certification.splice(index, 1);
    }

    profile
      .save()
      .then(p => res.json(p));
  })
  .catch(err => res.status(404).json(err)));

// @route  DELETE api/profile/publication/:id
// @desc   Delete a publication
// @access Private
router.delete('/publication/:id', passport.authenticate('jwt', { session: false }), (req, res) => Profile.findOne({ user: req.user.id })
  .then((profile) => {
    const index = _.findIndex(profile.publication, exp => exp.id === req.params.id);
    if (index > -1) {
      profile.publication.splice(index, 1);
    }

    profile
      .save()
      .then(p => res.json(p));
  })
  .catch(err => res.status(404).json(err)));


// @route  DELETE api/profile
// @desc   Delete user and profilel
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => Profile.findOneAndRemove({ user: req.user.id })
  .then(() => {
    User.findOneAndRemove({ id: req.user.id });
  })
  .then(() => res.json({ success: true }))
  .catch(() => res.status(500).json({ message: 'Internal Error' })));

module.exports = router;
