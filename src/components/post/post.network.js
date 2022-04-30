const express = require('express');
const { createSchema, editSchema } = require('./post.validator');
const { getValidationErrorMessage } = require('../../utils/errorUtils');
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

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id)
      throw new Error('Cannot retrieve a post without an id');

    if (id.length !== 24)
      throw new Error('Id format wrong');

    const post = await getById(id);
    response.succes(req, res, 'Get Post', 200, post);

  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const page = req.query.page || 1;

    const posts = await getByUserId(userId, page);
    response.succes(req, res, 'Get Posts', 200, posts);
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
});

router.post('/', validateToken, async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);
    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw new Error(errorMessage);
    }
    await createPost(req.userId, req.body);
    response.succes(req, res, 'Create Post', 200, 'Post Created succesfully');
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
});

router.put('/:id', validateToken, async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId)
      throw new Error('Cannot edit a post without an id');

    const newData = req.body;
    const { error } = editSchema.validate(newData);

    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw new Error(errorMessage);
    }

    await editPost(postId, req.userId, newData)
    response.succes(req, res, 'edit Post', 204);
  } catch (err) {
    response.error(req, res, 'edit Post', 400, err.message);
  }
});

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId)
      throw new Error('Cannot delete a post without an id');

    await deletePost(postId, req.userId);
    response.succes(req, res, 'Delete Post', 204)

  } catch (err) {
    response.error(req, res, 'Delete Post', 400, err.message);
  }
});

module.exports = router;
