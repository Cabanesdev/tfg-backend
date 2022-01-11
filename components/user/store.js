const { userModel } = require('./model');

const create = async (userdata) => {
	const user = await userModel.create([userdata]);
	return user;
};

const checkUsername = async (username) => {
	const user = await userModel.find({ username: username });
	return !user.length;
};

const checkEmail = async (email) => {
	const user = await userModel.find({ email: email });
	return !user.length;
};

module.exports = {
	create,
	checkUsername,
	checkEmail,
};
