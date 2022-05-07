const { create, getAll, incrementCommitsNumbers, getById, getAllByCommitIdWithPagination } = require('./commit.repository');
const checkIfCommitHasMoreCommits = require('../../utils/commits');

const createCommit = async (body, userId) => {
  try {
    const { content, commitId } = body;

    const commitData = {
      content,
      userId,
      creationDate: new Date(),
    }

    if (commitId) commitData.commitId = commitId
    await create(commitData);
    await incrementCommitsNumbers(commitId);

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
    const commit = await getById(commitId)
    if (commit.userId !== userId) throw new Error('You are not allowed to do this')   
    await checkIfCommitHasMoreCommits(commit._id.toString())

  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { createCommit, getAllCommits, getAllCommitsByCommitId, removeCommit }
