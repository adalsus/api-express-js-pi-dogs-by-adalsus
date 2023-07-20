// app.js
// where your node app starts


// init project
const express = require("express")
var favicon = require('serve-favicon')
var path = require('path')
var cors = require('cors')
const app = express();
const tree = require('./src/tree/tree.js');

app.use(cors())

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
tree(app)

module.exports = app