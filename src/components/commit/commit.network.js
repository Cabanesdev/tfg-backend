const express = require('express');
const response = require('../../network/responses');
const { validateToken } = require('../../utils/jwt');
const { getValidationErrorMessage } = require('../../utils/errorUtils');

const registerSchema = require('./commit.validator');
const { createCommit } = require('./commit.controller');

const router = express.Router();

router.post('/', validateToken, async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw new Error(errorMessage);
    }

    await createCommit(req.body, req.userId);

    response.error(req, res, 'Post Commit', 200, req.body);
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
})

module.exports = router

