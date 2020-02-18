const mongoose = require('mongoose');

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

const project = mongoose.model('Project', projectSchema);
module.exports = project;