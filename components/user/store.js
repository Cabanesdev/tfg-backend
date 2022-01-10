const { userModel } = require('./model');

let getAll = async () => {
	let users = await userModel.find({});
	return users;
};

let createOne = async (user) => {
	let users = await userModel.create([user]);
	console.log(`users ${users}`);
	return users;
};

let checkUsername = async (username) => {
	return await userModel.find({ username: username });
};

module.exports = {
	getAll,
	createOne,
	checkUsername,
};
