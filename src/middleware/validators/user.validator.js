const joi = require('joi');

const registerSchema = joi.object({
	username: joi.string().min(4).required(),
	password: joi.string().required(),
	email: joi.string().email().required(),
	firstname: joi.string().required(),
	surname1: joi.string().required(),
	surname2: joi.string(),
});

const loginSchema = joi.object({
	username: joi.string().required(),
	password: joi.string().required(),
});

module.exports = {
	registerSchema,
	loginSchema,
};
