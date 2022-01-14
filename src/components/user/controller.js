const {
	create,
	checkUsername,
	checkEmail,
	getUser,
	getPasswordByUsername,
} = require('./store');

const { encryptPass, comparePass } = require('@src/utils/encrypt');

const createUser = async (body) => {
	const { username, email } = body;
	const password = await encryptPass(body.password);
	const currentDate = new Date().toISOString().slice(0, 10);

	const user = {
		username,
		password,
		email,
		firstName: body.firstname,
		surname1: body.surname1,
		surname2: body.surname2,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	const existsUsername = await checkUsername(username);
	const existsEmail = await checkEmail(email);

	return new Promise(async (resolve, reject) => {
		if (!existsUsername) {
			if (!existsEmail) {
				const userCreated = await create(user);
				const userId = userCreated[0].id;
				const userData = await getUser(userId);
				resolve(userData);
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

const login = async (body) => {
	const { username } = body;
	const existsUser = await checkUsername(username);

	return new Promise(async (resolve, reject) => {
		if (existsUser) {
			const user = await getPasswordByUsername(username);
			const password = user[0].password;
			const isPasswordCorrect = await comparePass(body.password, password);

			if (isPasswordCorrect) resolve('Login successfully');
		}

		reject('Username or password is not correct');
	});
};

module.exports = {
	createUser,
	login,
};
