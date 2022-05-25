const express = require('express');
const response = require('../../network/responses');
const { validateToken } = require('../../utils/jwt');
const { getValidationErrorMessage } = require('../../utils/errorUtils');

const registerSchema = require('./commit.validator');
const { createCommit, getAllCommits, getAllCommitsByCommitId, removeCommit, getOneById } = require('./commit.controller');

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

router.get('', async (req, res) => {
  try {
    const userId = req.query.userId;
    const commitId = req.query.commitId;
    const page = req.query.page || 1;
    let commits;

    if (commitId) {
      commits = await getAllCommitsByCommitId(commitId, page);
    } else {
      commits = await getAllCommits(userId, page);
    }

    response.succes(req, res, 'Get Posts', 200, commits);

  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id: commitId } = req.params;
    const data = await getOneById(commitId);

    response.succes(req, res, 'Get Posts', 200, data);

  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
})

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id: commitId } = req.params
    await removeCommit(req.userId, commitId);
    response.succes(req, res, 'Delete Commit', 204, '');
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }

})

module.exports = router

