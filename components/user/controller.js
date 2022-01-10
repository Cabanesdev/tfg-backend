let { getAll, createOne, checkUsername, checkEmail } = require('./store');

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
		email: body.email,
		firstName: body.firstname,
		surname1: body.surname1,
		surname2: body.surname2,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	const userWithUserName = await checkUsername(body.username);
	const userWithEmail = await checkEmail(body.email);

	return new Promise((resolve, reject) => {
		if (userWithUserName.length === 0) {
			if (userWithEmail.length === 0) {
				let userCreated = createOne(user);
				resolve(userCreated);
			} else {
				reject('Email is already used');
			}
		}
		reject('Username is already used');
	});
};

module.exports = {
	getUser,
	createUser,
};
