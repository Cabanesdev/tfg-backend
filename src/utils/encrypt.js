const bcrypt = require('bcrypt');

const encryptPass = async (password) => await bcrypt.hash(password, 10);

const comparePass = async (password, encryptedPassword) =>
	await bcrypt.compare(password, encryptedPassword);

module.exports = {
	encryptPass,
	comparePass,
};
