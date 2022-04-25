const { ObjectId } = require('mongodb');
const { client } = require('../../db');

const create = async (data) => {
  await client
    .db()
    .collection('post')
    .insertOne(data);
};

const getPostById = async (id) =>
  await client
    .db()
    .collection('post')
    .findOne({ _id: ObjectId(id) });

const getPostsByUserId = async (userId, page) => {
  const findOptions = {}

  if (userId) findOptions.userId = userId

 return await client
    .db()
    .collection('post')
    .find(findOptions)
    .skip((page - 1) * 6)
    .limit(6)
    .toArray();

}

const edit = async (id, data) => {
  await client
    .db()
    .collection('news')
    .updateOne({ _id: ObjectId(id) }, { $set: data });

};

const deleteById = async (id) => {
  await client
    .db()
    .collection('news')
    .deleteOne({ _id: ObjectId(id) })
};

const deleteByUserId = async (userId) => await postModel.deleteMany({ userId });

module.exports = {
  create,
  getPostById,
  getPostsByUserId,
  edit,
  deleteById,
  deleteByUserId,
};
