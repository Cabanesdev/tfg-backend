const { client } = require('../../db');

const getByPostId = async (postId, page) =>
  await client
    .db()
    .collection('comment')
    .find({ postId })
    .sort({ creationDate: -1 })
    .skip((page - 1) * 10)
    .limit(10)
    .toArray();

const create = async (data) => {
  await client
    .db()
    .collection('comment')
    .insertOne(data)
};

module.exports = { getByPostId, create };
