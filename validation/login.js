const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateLoginInput(data) {
  let errors = {};

  if(_.isNil(data.email) || !Validator.isEmail(data.email)) {
    errors.email = 'Please provide valid email';
  }

  if(_.isNil(data.password) || !Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 chars';
  }

  return { errors };
}