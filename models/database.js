const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const URL = dbconfig.URL;

// mongoose.connect(URL);
// var db = mongoose.connection;

// db.on('error', console.log("Error connecting to the Db"));
// db.once('open', console.log("Connected to the DB"));

// db.close();

// module.exports = {

//     connection: ()=>{return db}

// };
