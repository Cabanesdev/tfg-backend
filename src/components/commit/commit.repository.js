const { client } = require('../../db');

const create = async (commitData) => {
  await client
    .db()
    .collection('commit')
    .insertOne(commitData)
}

module.exports = {create}
