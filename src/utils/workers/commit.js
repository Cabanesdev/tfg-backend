const workerpool = require('workerpool');
const { getAllByCommitId, removeCommit, decreaseCommitsNumber, getOne } = require('../../components/commit/commit.repository');
const { client } = require('../../db');

const deleteCommits = async (commitId) => {
  client.connect()
  const commits = await getAllByCommitId(commitId);
  if (!commits.length) {
    const commitData = await getOne(commitId);
    await decreaseCommitsNumber(commitData.commitId)
    await removeCommit(commitId);
  } else {
    for (let i = 0; i < commits.length; i++) {
      const commitData = commits[i];
      await deleteCommits(commitData._id.toString());
    }
    await removeCommit(commitId)
  }
}

workerpool.worker({
  deleteCommits,
});
