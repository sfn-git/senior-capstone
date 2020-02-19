const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const URL = dbconfig.URL;
const database = mongoose.connection;
var db = mongoose.connect(URL, {useNewUrlParser: true});

module.exports = {

    db: ()=>{return db},
    database: ()=>{return database}

};
