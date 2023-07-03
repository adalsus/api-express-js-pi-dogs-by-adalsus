const root = require('./routes/root.js')

const tree = app => app.use('/', root);

module.exports = tree;
