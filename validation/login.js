const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateLoginInput(data) {
  const errors = {};

  if (_.isEmpty(data.email) || !Validator.isEmail(data.email)) {
    errors.email = 'Please provide valid email';
  }

  if (_.isEmpty(data.password) || !Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 chars';
  }

  return { errors };
};
