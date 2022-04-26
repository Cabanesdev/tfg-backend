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
  username: joi.string().min(3),
  email: joi.string().email(),
  name: joi.string(),
  biography: joi.string(),
  webpage: joi.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
  editSchema,
};
