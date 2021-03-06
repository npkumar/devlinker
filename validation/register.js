const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  if (_.isEmpty(data.name) || !Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = 'Name must be between 3 and 30 chars';
  }

  if (_.isEmpty(data.email) || !Validator.isEmail(data.email)) {
    errors.email = 'Please provide valid email';
  }

  if (_.isEmpty(data.password) || !Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 chars';
  }

  if (
    _.isEmpty(data.confirmPassword) || !Validator.equals(data.password, data.confirmPassword)
  ) {
    errors.confirmPassword = 'Passwords must match';
  }

  return { errors };
};
