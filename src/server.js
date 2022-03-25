require('module-alias-jest/register');

const config = require('@config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const connectMongo = require('./db');

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
	exposedHeaders: ['x-access-token'],
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
