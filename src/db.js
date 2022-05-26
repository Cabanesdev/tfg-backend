const { MongoClient } = require('mongodb');
const config = require('./config/index');

const client = new MongoClient(config.uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('db connected')
  } catch (err) {
    console.error(err);
  }
}

module.exports = { client, connectDB };
