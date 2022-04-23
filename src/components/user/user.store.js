const userModel = require('./user.model');

const create = async (userdata) => {
  const user = await userModel.create([userdata]);
  return user[0];
};

const getUserById = async (id) =>
  await userModel.findById(id).select('-password');

const getUserByUsername = async (username) =>
  await userModel.findOne({ username }).select('-password');

const getUsersByUsername = async (username, page) =>
  await userModel
    .find({ username: { $regex: `^${username}.*` } })
    .select('-password')
    .skip((page - 1) * 5)
    .limit(5);

const getPasswordByUsername = async (username) =>
  await userModel.findOne({ username }).select('password');

const edit = async (id, data) => await userModel.findByIdAndUpdate(id, data);

const checkUsername = async (username) => await userModel.exists({ username });

const checkEmail = async (email) => await userModel.exists({ email });

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
