const { client } = require('../../db');

const getComments = async (postId, page) => {
  const findOptions = {
    postId,
    deleted: { $exists: false },
  }

 return await client
    .db()
    .collection('comment')
    .find(findOptions)
    .sort({ creationDate: -1 })
    .skip((page - 1) * 10)
    .limit(10)
    .toArray();
}


const create = async (data) => {
  await client
    .db()
    .collection('comment')
    .insertOne(data)
};

const deleteComments = async (postId) => {
  await client
    .db()
    .collection('comment')
    .updateMany({ postId }, { $set: { deleted: true } });
};

module.exports = { getComments, create, deleteComments };
