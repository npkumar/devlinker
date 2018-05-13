const Validator = require('validator');
const _ = require('lodash');

module.exports = function validatePostInput(data) {
  const errors = {};

  if (_.isNil(data.text) || !Validator.isLength(data.text, { min: 3, max: 30 })) {
    errors.text = 'Text must be between 3 and 30 chars';
  }

  return { errors };
};
