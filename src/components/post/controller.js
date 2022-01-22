const { create } = require('./store');

const createPost = (id, body) => {
	const creationDate = new Date().toISOString().slice(0, 10);

	const newPost = {
		title: body.title,
		content: body.content,
		userId: id,
		creationDate,
	};

	return new Promise(async (resolve) => {
		const post = await create(newPost);
		resolve(post);
	});
};

module.exports = { createPost };
