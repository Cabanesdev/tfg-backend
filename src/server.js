const config = require('./config/index');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const connectMongo = require('./db');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  exposedHeaders: ['bearer-token'],
};

let app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectMongo();

router(app);

app.listen(config.port, () => {
  console.log(`Listening in http://localhost:${config.port}`);
});

module.exports = app;
