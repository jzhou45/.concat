const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Room name is required';
  }

  if (!Validator.isLength(data.name, { max: 20 })) {
    errors.username = 'Room name cannot be more than 20 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
