const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateProfileInput(data) {
  const errors = {};

  if (_.isEmpty(data.handle) || !Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Please provide handle between 2 to 40 chars';
  }

  if (_.isEmpty(data.status)) {
    errors.status = 'Status is required';
  }

  if (_.isEmpty(data.skills)) {
    errors.skills = 'Skills is required';
  }

  if (data.website && !Validator.isURL(data.website)) {
    errors.website = 'Not a valid URL';
  }

  if (data.youtube && !Validator.isURL(data.youtube)) {
    errors.youtube = 'Not a valid URL';
  }

  if (data.facebook && !Validator.isURL(data.facebook)) {
    errors.facebook = 'Not a valid URL';
  }

  if (data.twitter && !Validator.isURL(data.twitter)) {
    errors.twitter = 'Not a valid URL';
  }

  if (data.linkedin && !Validator.isURL(data.linkedin)) {
    errors.linkedin = 'Not a valid URL';
  }

  if (data.github && !Validator.isURL(data.github)) {
    errors.github = 'Not a valid URL';
  }

  return { errors };
};
