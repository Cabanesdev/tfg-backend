const { ObjectId } = require('mongodb');
const { client } = require('../../db');

const create = async (commitData) => {
  await client
    .db()
    .collection('commit')
    .insertOne(commitData)
}

const getOne = async (commitId) =>
  await client
    .db()
    .collection('commit')
    .findOne({ _id: ObjectId(commitId) })

const getAll = async (userId, page) => {
  const findOptions = {
    deleted: { $exists: false },
  }

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

const getAllByCommitIdWithPagination = async (commitId, page) => {
  const findOptions = {
    commitId,
    deleted: { $exists: false },
  };

  return await client
    .db()
    .collection('commit')
    .find(findOptions)
    .skip((page - 1) * 10)
    .sort({ creationDate: -1 })
    .limit(10)
    .toArray();
}

const getAllByCommitId = async (commitId) =>
  await client
    .db()
    .collection('commit')
    .find({ commitId })
    .toArray();


const incrementCommitsNumbers = async (commitId) => {
  await client
    .db()
    .collection('commit')
    .updateOne({ _id: ObjectId(commitId) }, { $inc: { commitNumber: +1 } });
}

const decreaseCommitsNumber = async (commitId) => {
  await client
    .db()
    .collection('commit')
    .updateOne({ _id: ObjectId(commitId) }, { $inc: { commitNumber: -1 } });
}

const getById = async (commitId) =>
  await client
    .db()
    .collection('commit')
    .findOne({ _id: ObjectId(commitId) })

const removeCommit = async (id) => {
  await client
    .db()
    .collection('commit')
    .updateOne({ _id: ObjectId(id) }, { $set: { deleted: true } });
}


module.exports = { create, getAll, getAllByCommitIdWithPagination, getAllByCommitId, incrementCommitsNumbers, getById, removeCommit, getOne, decreaseCommitsNumber }
