const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateEducationInput(data) {
  const errors = {};

  if (_.isNil(data.school) || !Validator.isLength(data.school, { min: 3, max: 30 })) {
    errors.school = 'School must be between 3 and 30 chars';
  }

  if (_.isNil(data.degree) || !Validator.isLength(data.degree, { min: 2, max: 30 })) {
    errors.degree = 'Degree must be between 2 and 30 chars';
  }

  if (_.isNil(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'fieldOfStudy field is required';
  }

  if (_.isNil(data.from)) {
    errors.from = 'from field is required';
  }

  return { errors };
};
