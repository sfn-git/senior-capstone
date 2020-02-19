const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');
const URL = dbconfig.URL;

var config = {

    username: dbconfig.user,
    privateKey: require('fs').readFileSync(dbconfig.key),
    host: dbconfig.host,
    port: dbconfig.port,
    dstPort: dbconfig.port

}

var server = tunnel(config, (err,ser)=>{

    if(err) console.log(err);
    console.log("Connected to proxy server");

})

mongoose.connect(URL);
var db = mongoose.connection;

db.on('error', console.log("Error connecting to the Db"));
db.once('open', console.log("Connected to the DB"));

db.close();

// module.exports = {

//     connection: ()=>{return db}

// };
