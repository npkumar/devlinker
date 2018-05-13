const express = require('express');
const _ = require('lodash');

const router = express.Router();
const passport = require('passport');

// Modal
const Post = require('../../models/Post');

// Validator
const validatePostInput = require('../../validation/post');

// @route  GET api/posts/test
// @desc   Test posts route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    message: 'Posts!',
  });
});

// @route  POST api/posts
// @desc   Create Post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors } = validatePostInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const { text, name, avatar } = req.body;

  const newPost = new Post({
    text,
    name,
    avatar,
    user: req.user.id,
  });

  return newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
