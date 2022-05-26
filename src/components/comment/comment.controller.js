const { create, getComments } = require('./comment.repository');
const { incrementComments } = require('../post/post.repository');

const getAllComments = async (postId, page) => {
  try {
    const comments = await getComments(postId, page);
    return comments;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createComment = async (body, userId) => {
  try {
    const { content, postId } = body;
    const data = {
      content,
      postId,
      userId,
      creationDate: new Date(),
    };
    await create(data);
    await incrementComments(postId);

  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { getAllComments, createComment };
