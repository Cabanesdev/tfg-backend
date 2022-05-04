const {create} = require('./commit.repository') 
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

module.exports = { createCommit }
