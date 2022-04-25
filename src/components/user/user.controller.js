const {
  create,
  checkUsername,
  checkEmail,
  getPasswordByUsername,
  getUserById,
  getUserByUsername,
  edit,
  getUsersByUsername,
  // deleteById,
} = require('./user.repository');

const { encryptPass, comparePass } = require('../../utils/encrypt');

const createUser = async (body) => {
  const { username, email, password, name } = body;
  const encryptedPassword = await encryptPass(password);

  const newUser = {
    username,
    email,
    name,
    password: encryptedPassword,
    creationDate: new Date()
  };

  const existsUsername = await checkUsername(username);
  const existsEmail = await checkEmail(email);

  return new Promise(async (resolve, reject) => {
    if (existsUsername) return reject('Username is already being used');
    if (existsEmail) return reject('Email is already being used');

    await create(newUser);
    resolve();
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

  return new Promise(async (resolve, reject) => {
    if (username) {
      const existsUsername = await checkUsername(username);
      if (existsUsername) return reject('Username is already being used');
    }

    if (email) {
      const existsEmail = await checkEmail(email);
      if (existsEmail) return reject('Email is already being used');
    }

    await edit(id, body);
    resolve('User has been updated');
  });
};

const searchByUsername = async (username, page) => {
  return new Promise(async (resolve) => {
    const users = await getUsersByUsername(username, page);
    resolve(users);
  });
};

const getUser = async (userId) => {
  return new Promise(async (resolve) => {
    const users = await getUserById(userId);
    resolve(users);
  });
};

module.exports = {
  createUser,
  login,
  editUser,
  searchByUsername,
  getUser,
};
