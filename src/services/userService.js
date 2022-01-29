const deleteAllByUserId = async (userId) => {
	const { deleteByUserId } = require('@components/post/store');
	try {
		await deleteByUserId(userId);
	} catch (err) {
		return { error: err };
	}
};

module.exports = { deleteAllByUserId };
