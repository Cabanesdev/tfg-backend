const commentModel = require('./model');

const getByPostsId = async (postId, page) =>
  await commentModel
    .find({ postId })
    .skip((page - 1) * 10)
    .limit(10);

const create = async (data) => {
  await commentModel.create(data);
};

module.exports = { getByPostsId, create };
