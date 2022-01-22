const joi = require('joi');

const createSchema = joi.object({
	title: joi.string().required(),
	content: joi.string().required(),
});

module.exports = { createSchema };
