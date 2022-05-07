const { getAllByCommitId, removeCommit } = require('../components/commit/commit.repository')

const checkIfCommitHasMoreCommits = async (commitId) => {
  const commits = await getAllByCommitId(commitId);
  if (!commits.length) {
    await removeCommit(commitId)
  } else {
    for (let i = 0; i < commits.length; i++) {
      const commitData = commits[i];
      await checkIfCommitHasMoreCommits(commitData._id.toString());
    }
    await removeCommit(commitId)
  }
}

module.exports = checkIfCommitHasMoreCommits;
