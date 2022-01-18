const joi = require('joi');

const registerSchema = joi.object({
	username: joi.string().min(3).required(),
	password: joi.string().required(),
	email: joi.string().email().required(),
	name: joi.string().required(),
	birthday: joi.date().iso().required(),
	biography: joi.string().required(),
	webpage: joi.string().required(),
});

const loginSchema = joi.object({
	username: joi.string().required(),
	password: joi.string().required(),
});

module.exports = {
	registerSchema,
	loginSchema,
};
