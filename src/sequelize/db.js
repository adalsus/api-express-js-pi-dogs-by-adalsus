require('dotenv').config();
const fdeco = require('./src/fns/fnsApi.js');

const { DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,DB_NAME } = process.env;
const DB_URI =
`postgres://${fdeco(JSON.parse(DB_USER))}:${fdeco(JSON.parse(DB_PASSWORD))}@${DB_HOST}:${DB_PORT}/${DB_NAME}`