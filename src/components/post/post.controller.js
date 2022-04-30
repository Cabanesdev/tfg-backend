const {
  create,
  getPostById,
  edit,
  deleteById,
  getPostsByUserId,
} = require('./post.repository');

const getById = async (id) => {
  try {
    const post = await getPostById(id);
    return post;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getByUserId = async (userId, page) => {
  try {
    const posts = await getPostsByUserId(userId, page);
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
}

const createPost = async (userId, body) => {
  try {
    const { title, content } = body;
    const newPost = {
      title,
      content,
      userId,
      creationDate: new Date(),
      comments: 0
    };

    await create(newPost);
  } catch (err) {
    throw new Error(err.message);
  }
}

const editPost = async (postId, userId, newData) => {
  try {
    const { userId: postOwner } = await getPostById(postId);
    if (userId !== postOwner) throw new Error('You are not allowed to do this');

    await edit(postId, newData)
  } catch (err) {
    throw new Error(err.message);
  }
}

const deletePost = async (postId, userId) => {
  try {
    const { userId: postOwner } = await getPostById(postId);
    if (userId !== postOwner) throw new Error('You are not allowed to do this');

    await deleteById(postId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getById, getByUserId, createPost, editPost, deletePost };
