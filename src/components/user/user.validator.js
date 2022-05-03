const joi = require('joi');

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().min(3).required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const editSchema = joi.object({
  name: joi.string(),
  username: joi.string().min(3),
  email: joi.string().email(),
  biography: joi.string().empty(''),
  webpage: joi.string().uri().empty(''),
  github: joi.string().uri().empty(''),
  linkedin: joi.string().uri().empty('')
});

module.exports = {
  registerSchema,
  loginSchema,
  editSchema,
};
