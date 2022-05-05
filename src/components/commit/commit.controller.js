const { create, getAll, getAllByCommitId } = require('./commit.repository')

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
    const commits = await getAllByCommitId(commitId, page)
    return commits;
  } catch (err) {
    throw new Error(err.message);
  }

}

module.exports = { createCommit, getAllCommits, getAllCommitsByCommitId }
