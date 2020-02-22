const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const db = mongoose.connection;
const URL = dbconfig.URL;

module.exports = mongoose.connect(URL, {useNewUrlParser: true});

