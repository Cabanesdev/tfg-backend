const express = require('express');
const { createSchema, editSchema } = require('./post.validator');
const { validateToken } = require('../../utils/jwt');
const response = require('../../network/responses');

const {
  createPost,
  getById,
  getByUserId,
  editPost,
  deletePost,
} = require('./post.controller');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!id)
    return response.error(
      req,
      res,
      'Error',
      400,
      'Cannot retrieve a post without an id'
    );

  getById(id)
    .then((data) => response.succes(req, res, 'Get Post', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

router.get('/', validateToken, (req, res) => {
  const userId = req.query.userId;

  if (!userId)
    return response.error(req, res, 'Error', 400, 'User Id can not be empty');
  const page = req.query.page | 1;

  getByUserId(userId, page)
    .then((data) => response.succes(req, res, 'Get Post by User', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

router.post('/', validateToken, (req, res) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    const { getValidationErrorMessage } = require('@utils/errorUtils');
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  createPost(req.userId, req.body)
    .then((data) => response.succes(req, res, 'Create Post', 200, data))
    .catch((err) => response.error(req, res, 'Error', 200, err));
});

router.put('/:id', validateToken, (req, res) => {
  const postId = req.params.id;

  if (!postId)
    return response.error(
      req,
      res,
      'Error',
      400,
      'Cannot edit a post without an id'
    );

  const newData = req.body;
  const { error } = editSchema.validate(newData);

  if (error) {
    const { getValidationErrorMessage } = require('@utils/errorUtils');
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  editPost(postId, req.userId, newData)
    .then(() => response.succes(req, res, 'edit Post', 204))
    .catch((err) => response.error(req, res, 'edit Post', 400, err));
});

router.delete('/:id', validateToken, (req, res) => {
  const postId = req.params.id;

  if (!postId)
    return response.error(
      req,
      res,
      'Error',
      400,
      'Cannot delete a post without an id'
    );

  deletePost(postId, req.userId)
    .then(() => response.succes(req, res, 'Delete Post', 204))
    .catch((err) => response.error(req, res, 'Delete Post', 400, err));
});

module.exports = router;
