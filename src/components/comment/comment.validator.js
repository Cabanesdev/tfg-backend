const joi = require('joi');

const createSchema = joi.object({
  postId: joi.string().required(),
  content: joi.string().required().max(500),
});

module.exports = createSchema;
