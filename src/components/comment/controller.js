const { create, getByPostId } = require('./store');

const pagination = (postId, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await getByPostId(postId, page));
    } catch (err) {
      reject(err.message);
    }
  });
};

const createComment = (body, userId) => {
  const { content, postId } = body;
  const creationDate = new Date().toLocaleDateString();

  const data = {
    content,
    postId,
    userId,
    creationDate,
  };

  return new Promise(async (resolve, reject) => {
    try {
      await create(data);
      resolve('Comment Created Succesfully');
    } catch (err) {
      reject(err.message);
    }
  });
};

module.exports = { pagination, createComment };
