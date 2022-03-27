const commentModel = require('./model');

const create = async (data) => {
  await commentModel.create(data);
};

module.exports = { create };
