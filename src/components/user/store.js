const { userModel } = require('./model');

const create = async (userdata) => {
	const user = await userModel.create([userdata]);
	return user;
};

const getUser = async (id) => await userModel.findById(id).select('-password');

const checkUsername = async (username) => await userModel.exists({ username });

const checkEmail = async (email) => await userModel.exists({ email });

module.exports = {
	create,
	checkUsername,
	checkEmail,
	getUser,
};
