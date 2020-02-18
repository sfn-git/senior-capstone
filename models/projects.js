// const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
// const URL = `mongodb://${dbconfig.user}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}/${dbconfig.database}?authSource=${dbconfig.authenticationDatabase}`;
// const database = mongoose.connection;

// var schema = mongoose.Schema;

// mongoose.connect(URL, {useNewUrlParser: true}, (err,db) =>{
//     if(err) {
//         console.log("uh oh big haha error big funny");
//         throw err;
//     }
// });

// database.on('error', () => console.log('Error occurred on database.'));
// database.once('connected', () => console.log(`Connected to database at ${dbconfig.host}`));


var projectSchema = new schema({

    _id: mongoose.Schema.Types.ObjectId,
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

// Testing the schema
const projects = mongoose.model('projects', projectSchema);
