const joi = require('joi');

const createSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

const editSchema = joi.object({
  title: joi.string().required().empty(),
  content: joi.string().required().empty(),
});

module.exports = { createSchema, editSchema };
