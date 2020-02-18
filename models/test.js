// This file can be used to reference how to insert and how to search for a specific model
const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const URL = `mongodb://${dbconfig.user}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}/${dbconfig.database}?authSource=${dbconfig.authenticationDatabase}`;
const database = mongoose.connection;

var schema = mongoose.Schema;

var db = mongoose.connect(URL, {useNewUrlParser: true});
database
.once('connected', ()=> console.log(`Connected to db`))
.on('error', (err)=> console.log(`Error connecting to the db.`));

var testSchema = new schema({

    name: String

})



var test = mongoose.model('Test', testSchema);

test.find({}, (err, findMe)=>{

    if(err) console.error(err);
    console.log(findMe);
    database.close();

});

// var newTest = new test({name: "Testing"});
// console.log(newTest.name);

// newTest.save((err, newTest)=>{

//     if(err) return console.error(err);
//     console.log(newTest);
//     database.close();
// })

