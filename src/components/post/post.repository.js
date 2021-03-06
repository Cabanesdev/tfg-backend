const { ObjectId } = require('mongodb');
const { client } = require('../../db');

const create = async (data) => {
  await client
    .db()
    .collection('post')
    .insertOne(data);
}

const getPostById = async (id) =>
  await client
    .db()
    .collection('post')
    .findOne({ _id: ObjectId(id) });

const getPostsByUserId = async (userId, page) => {
  const findOptions = {
    deleted: { $exists: false },
  }

  if (userId) findOptions.userId = userId

  return await client
    .db()
    .collection('post')
    .find(findOptions)
    .skip((page - 1) * 10)
    .sort({ creationDate: -1 })
    .limit(10)
    .toArray();
}

const getPostsByTitle = async (titleQuery, page) => {
  const findOptions = {
    title: { $regex: titleQuery },
    deleted: { $exists: false },
  }

  return await client
    .db()
    .collection('post')
    .find(findOptions)
    .skip((page - 1) * 10)
    .sort({ creationDate: -1 })
    .limit(10)
    .toArray();
}

const edit = async (id, data) => {
  await client
    .db()
    .collection('post')
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

const incrementComments = async (id) => {
  await client
    .db()
    .collection('post')
    .updateOne({ _id: ObjectId(id) }, { $inc: { comments: +1 } });
}

const deleteById = async (id) => {
  await client
    .db()
    .collection('post')
    .updateOne({ _id: ObjectId(id) }, { $set: { deleted: true } });
}



module.exports = {
  create,
  getPostById,
  getPostsByUserId,
  edit,
  deleteById,
  incrementComments,
  getPostsByTitle
};
