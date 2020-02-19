// This file can be used to reference how to insert and how to search for a specific model
const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const URL = dbconfig.URL;
const database = mongoose.connection;
console.log(URL);
var schema = mongoose.Schema;

var db = mongoose.connect(URL, {useNewUrlParser: true});
database
.once('connected', ()=> console.log(`Connected to db`))
.on('error', (err)=> console.log(`Error connecting to the db.`));

var testSchema = new schema({

    name: String

})

/*
To find a specific document in mongo
*/

// var test = mongoose.model('Test', testSchema);

// test.find({}, (err, findMe)=>{

//     if(err) console.error(err);
//     console.log(findMe);
//     database.close();

// });

/*
To insert model into mongo
*/

// var newTest = new test({name: "Testing"});
// console.log(newTest.name);

// newTest.save((err, newTest)=>{

//     if(err) return console.error(err);
//     console.log(newTest);
//     database.close();
// })

// Testing major
// const major = require('major.js');

// var insertMajor = new major({

//     major: "Computer Science",
//     college: "College of Natural and Applied Health Sciences"

// })

// insertMajor.save()

database.close();