const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const URL = dbconfig.URL;

module.exports = mongoose.connect(URL);

