const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');
const URL = dbconfig.URL;

var config = {

    username: dbconfig.user,
    privateKey: require('fs').readFileSync(dbconfig.key),
    host: dbconfig.host,
    port: dbconfig.port

}



// module.exports = {

//     connection: ()=>{return db}

// };
