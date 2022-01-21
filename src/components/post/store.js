const postModel = require('./model');

const create = async (data) => {
	const post = await postModel.create([data]);
	return post[0];
};

module.exports = { create };
