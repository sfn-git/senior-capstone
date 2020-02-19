const mongoose = require('mongoose');
const schema = mongoose.Schema;


var projectSchema = new schema({

    _id: mongoose.Schema.Types.ObjectId,
    presentationType: String,
    title: String,
    abstract: String,
    projectArea: String,
    researchLocation: String,
    researchFunding: String,
    rdYear: Number,
    submitter: {id: String},
    copis: [{id: String}],
    facultyAdvisor: [{id: String}],
    fileLoc: String,
    dateSubmitted: {type:Date, default:Date.now}

});

const project = mongoose.model('Project', projectSchema);
module.exports = ()=>{return project};