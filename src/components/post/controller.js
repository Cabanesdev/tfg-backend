const { create, getPostById } = require('./store');

const createPost = (id, body) => {
	const currentDate = new Date().toISOString().slice(0, 10);

	const newPost = {
		title: body.title,
		content: body.content,
		userId: id,
		creationDate: currentDate,
	};

	return new Promise(async (resolve) => {
		const post = await create(newPost);
		resolve(post);
	});
};

const getPost = (id) =>
	new Promise(async (resolve) => resolve(await getPostById(id)));

module.exports = { createPost, getPost };
