const express = require('express');
const { validateToken } = require('../../utils/jwt');
const { getValidationErrorMessage } = require('../../utils/errorUtils');
const response = require('../../network/responses');
const { createComment, pagination } = require('./comment.controller');
const createSchema = require('./comment.validator');

const router = express.Router();

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
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  createComment(req.body, req.userId)
    .then((data) => response.succes(req, res, 'Create Comment', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

module.exports = router;
