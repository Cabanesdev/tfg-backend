const workerpool = require('workerpool');
const config = require('../../config/index');
const { create, getAll, incrementCommitsNumbers, getById, getAllByCommitIdWithPagination, getOne } = require('./commit.repository');

const createCommit = async (body, userId) => {
  try {
    const { content, commitId } = body;

    const commitData = {
      content,
      userId,
      creationDate: new Date(),
      commitNumber: 0
    }

    if (commitId) commitData.commitId = commitId
    await create(commitData);
    await incrementCommitsNumbers(commitId);

  } catch (err) {
    throw new Error(err.message);
  }
}

const getOneById = async (commitId) => {
  try {
    const commit = await getOne(commitId);
    if (commit.deleted) throw new Error('This commit not exists');
    return commit
  } catch (err) {
    throw new Error(err.message);
  }
}

const getAllCommits = async (userId, page) => {
  try {
    const commits = await getAll(userId, page)
    return commits;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getAllCommitsByCommitId = async (commitId, page) => {
  try {
    const commits = await getAllByCommitIdWithPagination(commitId, page)
    return commits;
  } catch (err) {
    throw new Error(err.message);
  }
}

const removeCommit = async (userId, commitId) => {
  try {
    const pool = workerpool.pool(`${__dirname}/../../utils/workers/commit.js`, {
      maxWorkers: config.threads,
    });

    const commit = await getById(commitId);
    if (commit.userId !== userId) throw new Error('You are not allowed to do this');

    await pool.exec('deleteCommits', [commit._id.toString()]);

  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { createCommit, getAllCommits, getAllCommitsByCommitId, removeCommit, getOneById }
