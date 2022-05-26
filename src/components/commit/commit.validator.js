const joi = require('joi');

const createSchema = joi.object({
  content: joi.string().max(280).required(),
  commitId: joi.string(),
})

module.exports = createSchema;

