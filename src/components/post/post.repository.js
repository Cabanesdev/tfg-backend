const mongoose = require('mongoose');
const postModel = require('./post.model');

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

const getPostsByUserId = async (userId, page) =>
  await client
    .db()
    .collection('post') 
    .find({ userId })
    .skip((page - 1) * 10)
    .limit(10)
    .toArray();

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
