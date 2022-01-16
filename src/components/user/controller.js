const {
	create,
	checkUsername,
	checkEmail,
	getPasswordByUsername,
	getUserById,
} = require('./store');

const { encryptPass, comparePass } = require('@src/utils/encrypt');

const createUser = async (body) => {
	const { username, email } = body;
	const password = await encryptPass(body.password);
	const currentDate = new Date().toISOString().slice(0, 10);

	const newUser = {
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
				const userCreated = await create(newUser);
				const userId = userCreated.id;
				const user = await getUserById(userId);
				resolve(user);
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

const login = async (body) => {
	const { username } = body;
	const isAlreadyExists = await checkUsername(username);

	return new Promise(async (resolve, reject) => {
		if (isAlreadyExists) {
			const { password } = await getPasswordByUsername(username);
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
