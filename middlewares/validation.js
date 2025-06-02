const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validation
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// ✅ Validate clothing item creation
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

// ✅ Validate user registration
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required(),
  }),
});

// ✅ Validate login
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required(),
  }),
});

// ✅ Validate IDs in URL params
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required(),
  }),
});

// ✅ Validate user update
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

module.exports = {
  validateCardBody,
  validateUserBody,
  validateLogin,
  validateId,
  validateUserUpdate,
};
