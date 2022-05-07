const workerpool = require('workerpool');
const { getAllByCommitId, removeCommit } = require('../../components/commit/commit.repository');
const { client } = require('../../db');

const deleteCommits = async (commitId) => {
  client.connect()
  const commits = await getAllByCommitId(commitId);
  console.log(commits)
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

workerpool.worker({
  deleteCommits,
});
