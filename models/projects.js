const mongoose = require('mongoose');
const schema = mongoose.Schema;


var projectSchema = new schema({

    _id: mongoose.Schema.Types.ObjectId,
    presentationType: String,
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

const project = mongoose.model('Project', projectSchema);
module.exports = ()=>{return project};