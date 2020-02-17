const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const host = dbconfig.host;
const user = dbconfig.user;
const pass = dbconfig.password;
const authdb = dbconfig.authenticationDatabase;
const dbport = dbconfig.port;
const mongoDatabase = dbconfig.database;
const URL = `mongodb://${user}:${pass}@${host}:${dbport}/${mongoDatabase}?authSource=${authdb}`;
const database = mongoose.connection;

var schema = mongoose.Schema;

console.log(URL);

mongoose.connect(URL, {useNewUrlParser: true}, (err,db) =>{
    if(err) {
        console.log("uh oh big haha error big funny");
        throw err;
    }
    // console.log(db);
    db.close();
});

database.on('error', () => console.log('Error occurred on database.'));
database.once('connected', () => console.log(`Connected to database at ${host}`));


var projects = new schema({

    presentaionType: String,
    title: String,
    abstract: String,
    projectArea: String,
    researchLocation: String,
    researchFunding: [{name: String}],
    rdYear: Number,
    submitter: String,
    copis: [{id: String}],
    facultyAdvisor: [{id: String}],
    fileLoc: String,
    dateSubmitted: Date

});
