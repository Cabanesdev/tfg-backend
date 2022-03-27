const express = require('express');
const router = express.Router();

const createSchema = require('@validators/comment.validator');
const { validateToken } = require('@src/middleware/jwt');
const { createComment, pagination } = require('./controller');

const response = require('@responses');

router.get('/', validateToken, (req, res) => {
  const postId = req.query.postId;
  const page = req.query.page | 1;

  if (!postId)
    return response.error(
      req,
      res,
      'Error',
      400,
      'Cannot retrieve a post without an id'
    );

  pagination(postId, page)
    .then((data) => response.succes(req, res, 'Get Comments', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

router.post('/', validateToken, (req, res) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    const { getValidationErrorMessage } = require('@utils/errorUtils');
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  createComment(req.body, req.userId)
    .then((data) => response.succes(req, res, 'Create Comment', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

module.exports = router;
