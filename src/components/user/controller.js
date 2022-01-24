const {
	create,
	checkUsername,
	checkEmail,
	getPasswordByUsername,
	getUserById,
	getUserByUsername,
	edit,
	getUsersByUsername,
	deleteById,
} = require('./store');

const deleteAllByUserId = require('@services/userService');

const { encryptPass, comparePass } = require('@utils/encrypt');

const createUser = async (body) => {
	const { username, email, password } = body;
	const encryptedPassword = await encryptPass(password);
	const currentDate = new Date().toISOString().slice(0, 10);

	const newUser = {
		username,
		password: encryptedPassword,
		email,
		name: body.name,
		biography: body.biography,
		webpage: body.webpage,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	const existsUsername = await checkUsername(username);
	const existsEmail = await checkEmail(email);

	return new Promise(async (resolve, reject) => {
		if (!existsUsername) {
			if (!existsEmail) {
				const { id } = await create(newUser);
				resolve(await getUserById(id));
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

const login = async (body) => {
	const { username, password } = body;
	const userExists = await checkUsername(username);

	return new Promise(async (resolve, reject) => {
		if (userExists) {
			const { password: encryptedPassword } = await getPasswordByUsername(
				username
			);
			const isPasswordCorrect = await comparePass(password, encryptedPassword);
			if (isPasswordCorrect) resolve(await getUserByUsername(username));
		}

		reject('Username or password is not correct');
	});
};

const editUser = async (id, body) => {
	const { username, email } = body;
	const newData = {
		name: body.name,
		biography: body.biography,
		webpage: body.webpage,
	};

	return new Promise(async (resolve, reject) => {
		if (username) {
			newData.username = username;
			const existsUsername = await checkUsername(username);
			if (existsUsername) return reject('Username is already being used');
		}

		if (email) {
			newData.email = email;
			const existsEmail = await checkEmail(email);
			if (existsEmail) return reject('Email is already being used');
		}

		await edit(id, newData);
		resolve('User has been updated');
	});
};

const searchByUsername = async (username, limit, page) => {
	return new Promise(async (resolve) => {
		const users = await getUsersByUsername(username, limit, page);
		resolve(users);
	});
};

const deleteUser = async (id) => {
	const isAllDeleted = deleteAllByUserId(id);
	return new Promise(async (resolve, reject) => {
		if (!isAllDeleted) return reject('An inexperienced error has occurred');
		await deleteById(id);
		resolve('User succesfully deleted ');
	});
};

module.exports = {
	createUser,
	login,
	editUser,
	searchByUsername,
	deleteUser,
};
