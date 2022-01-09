let { getAll, createOne } = require('./store');

let getUser = () => {
	return new Promise((resolve, reject) => {
		let usersListed = getAll();
		resolve(usersListed);
	});
};

let createUser = (body) => {
	const currentDate = new Date().toISOString().slice(0, 10);
	const user = {
		username: body.username,
		password: body.password,
		firstName: body.firstname,
		surname1: body.surname1,
		surname2: body.surname2,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	return new Promise((resolve, reject) => {
		let userCreated = createOne(user);
		resolve(userCreated);
	});
};

module.exports = {
	getUser,
	createUser,
};
