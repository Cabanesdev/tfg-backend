const { ObjectId } = require('mongodb');
const { client } = require('../../db');

const create = async (user) => {
  await client.db()
    .collection('user')
    .insertOne(user)
};

const getUserById = async (id) =>
  await client.db()
    .collection('user')
    .findOne({ _id: ObjectId(id) }, { projection: { password: 0 } });

const getUserByUsername = async (username) =>
  await client.db()
    .collection('user')
    .findOne({ username }, { projection: { password: 0 } });

const getUsersByUsername = async (username, page) =>
  await client.db().collection('user')
    .find({ username: { $regex: `^${username}.*` } }, {projection: {password: 0}})
    .skip((page - 1) * 15)
    .limit(15)
    .toArray();


const getPasswordByUsername = async (username) =>
  await client.db()
    .collection('user')
    .findOne({ username }, { projection: { password: 1 } });


const edit = async (id, data) => {
  console.log(id)
  console.log(data)
  await client.db()
    .collection('user')
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

const checkUsername = async (username) =>
  await client.db()
    .collection('user')
    .findOne({ username });


const checkEmail = async (email) =>
  await client.db()
    .collection('user')
    .findOne({ email });

const deleteById = async (id) => await userModel.findByIdAndDelete(id);

module.exports = {
  create,
  checkUsername,
  checkEmail,
  getUserById,
  getUserByUsername,
  edit,
  getPasswordByUsername,
  getUsersByUsername,
  deleteById,
};
