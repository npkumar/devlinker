const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateAwardInput(data) {
  const errors = {};

  if (_.isNil(data.title) || !Validator.isLength(data.title, { min: 3, max: 30 })) {
    errors.title = 'Title must be between 3 and 30 chars';
  }

  return { errors };
};
