const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateExperienceInput(data) {
  const errors = {};

  if (_.isNil(data.title) || !Validator.isLength(data.title, { min: 3, max: 30 })) {
    errors.title = 'Title must be between 3 and 30 chars';
  }

  if (_.isNil(data.company) || !Validator.isLength(data.company, { min: 2, max: 30 })) {
    errors.company = 'Company must be between 2 and 30 chars';
  }

  if (_.isNil(data.from)) {
    errors.from = 'From field is required';
  }

  return { errors };
};
