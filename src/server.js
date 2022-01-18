require('module-alias/register');

const config = require('@config');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = require('./network/routes');

const connectMongo = require('./db');

let app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectMongo();

router(app);

app.listen(config.port, () => {
	console.log(`Listening in http://localhost:${config.port}`);
});
