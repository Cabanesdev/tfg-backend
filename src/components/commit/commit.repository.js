const { client } = require('../../db');

const create = async (commitData) => {
  await client
    .db()
    .collection('commit')
    .insertOne(commitData)
}

const getAll = async (userId, page) => {
  const findOptions = {}

  if (userId) findOptions.userId = userId

  return await client
    .db()
    .collection('commit')
    .find(findOptions)
    .skip((page - 1) * 10)
    .sort({ creationDate: -1 })
    .limit(10)
    .toArray();
}

const getAllByCommitId = async (commitId, page) =>
  await client
    .db()
    .collection('commit')
    .find({ commitId })
    .skip((page - 1) * 10)
    .sort({ creationDate: -1 })
    .limit(10)
    .toArray();

module.exports = { create, getAll, getAllByCommitId }
