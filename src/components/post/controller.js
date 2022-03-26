const { create, getPostById, edit, deleteById } = require('./store');

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

const editPost = (postId, userId, newData) => {
	return new Promise(async (resolve, reject) => {
		const { userId: postOwner } = await getPostById(postId);
		if (userId !== postOwner) return reject('You are not allowed to do this');

		resolve(await edit(postId, newData));
	});
};

const deletePost = (postId, userId) => {
	return new Promise(async (resolve, reject) => {
		const { userId: postOwner } = await getPostById(postId);
		if (userId !== postOwner) return reject('You are not allowed to do this');

		resolve(await deleteById(postId));
	});
};

module.exports = { getById, getByUserId, createPost, editPost, deletePost };
