const express = require('express');
const router = express.Router();

const createSchema = require('@validators/comment.validator');
const { validateToken } = require('@src/middleware/jwt');
const { createComment } = require('./controller');

const response = require('@responses');

router.post('/', validateToken, (req, res) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    const { getValidationErrorMessage } = require('@utils/errorUtils');
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  createComment(req.body, req.userId)
    .then((data) => response.succes(req, res, 'Create User', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

module.exports = router;
