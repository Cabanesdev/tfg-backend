const express = require('express');
const { validateToken } = require('../../utils/jwt');
const { getValidationErrorMessage } = require('../../utils/errorUtils');
const response = require('../../network/responses');
const { createComment, getAllComments } = require('./comment.controller');
const createSchema = require('./comment.validator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const postId = req.query.postId;
    const page = req.query.page || 1;

    if (!postId)
      return response.error(
        req,
        res,
        'Error',
        400,
        'Cannot retrieve a post without an id'
      );

    const comments = await getAllComments(postId, page);
    response.succes(req, res, 'Get Comments', 200, comments);
  } catch (err) {
    response.error(req, res, 'Error', 400, err)
  }
});

router.post('/', validateToken, async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);

    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw new Error(errorMessage);
    }

    await createComment(req.body, req.userId)
    response.succes(req, res, 'Create Comment', 200, 'Comment Created Succesfully');
  }
  catch (err) {
    response.error(req, res, 'Error', 400, err)
  }
});

module.exports = router;
