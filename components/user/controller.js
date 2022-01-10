let { getAll, createOne, checkUsername } = require('./store');

let getUser = () => {
	return new Promise((resolve, reject) => {
		let usersListed = getAll();
		resolve(usersListed);
	});
};

let createUser = async (body) => {
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

	const checkUser = await checkUsername(body.username);

	return new Promise((resolve, reject) => {
		if (checkUser.length === 0) {
			let userCreated = createOne(user);
			resolve(userCreated);
		}
		reject('Username is not aviable');
	});
};

module.exports = {
	getUser,
	createUser,
};
