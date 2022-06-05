const {
  create,
  getPostById,
  edit,
  deleteById,
  getPostsByUserId,
  getPostsByTitle,
} = require('./post.repository');

const { deleteComments } = require('../comment/comment.repository');

const getById = async (id) => {
  try {
    const post = await getPostById(id);
    if (post.deleted) throw new Error('This post not exists');
    return post;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getByUserId = async (postId, userId, page) => {
  try {
    const posts = await getPostsByUserId(postId, userId, page);
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getByTitleQuery = async (title, page) => {
  try {
    const posts = await getPostsByTitle(title, page);
    return posts
  }
  catch (err) {
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

    await deleteComments(postId)
    await deleteById(postId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getById, getByUserId, createPost, editPost, deletePost, getByTitleQuery };
