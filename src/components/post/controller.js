const { create, getPostById, getPostsByUserId } = require('./store');

const getById = (id) =>
	new Promise(async (resolve) => resolve(await getPostById(id)));

const getByUserId = (userId, page) =>
	new Promise(async (resolve) => resolve(await getPostsByUserId(userId, page)));

const createPost = (userId, body) => {
	const { title, content } = body;
	const creationDate = new Date().toLocaleDateString(); // mm/dd/yyyy

	const newPost = {
		title,
		content,
		userId,
		creationDate,
	};

	return new Promise(async (resolve) => {
		const post = await create(newPost);
		resolve(post);
	});
};

module.exports = { getById, getByUserId, createPost };
