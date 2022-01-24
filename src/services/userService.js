const deleteAllByUserId = async (userId) => {
	const { deleteByUserId } = require('@components/post/store');
	await deleteByUserId(userId);
	return true;
};

module.exports = deleteAllByUserId;
