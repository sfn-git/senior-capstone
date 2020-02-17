const mongoose = require("mongoose");
var schema = mongoose.Schema;

var projects = new schema({

    presentaionType: String,
    title: String,
    abstract: String,
    projectArea: String,
    researchLocation: String,
    researchFunding: {name: String},
    rdYear: Number,
    submitter: String,
    copis: {id: String},
    facultyAdvisor: {id: String},
    fileLoc: String,
    dateSubmitted: Date

});
