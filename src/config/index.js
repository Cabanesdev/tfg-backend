require('dotenv').config();
const fs = require('fs');
const path = require('path')
const projectConf = require('./conf.json')
const { NODE_ENV, PORT, TOKEN_KEY } = process.env;

let conf = projectConf;

if (fs.existsSync(path.resolve(__dirname, './conf.local.json'))) {
  const localConf = require('./conf.local.json');
  conf = Object.assign(conf, localConf);
}

if (NODE_ENV === 'test') {
  const testConf = require('./conf.test.json');
  conf = Object.assign(conf, testConf);
} else {
  const devConf = require('./conf.dev.json');
  conf = Object.assign(conf, devConf);
}


const config = {
  port: PORT || 3000,
  tokenKey: TOKEN_KEY || conf.jwt.key,
  threads: conf.threads || 6,
  uri: conf.uri,
};

module.exports = config;
