const mongoose = require('mongoose');
const schema = mongoose.Schema;


var projectSchema = new schema({
    // _ID get automatically generated
    presentationType: {type: String},
    title: {type: String},
    abstractSubmitted: {type: String},
    abstractApproved: {type: String},
    projectArea: {type: String},
    researchLocation: {type: String},
    researchFunding: {type: String},
    rdYear: {type: Number},
    submitter: {type: mongoose.Types.ObjectId},
    copis: [{type: mongoose.Types.ObjectId}],
    facultyAdvisor: {type: mongoose.Types.ObjectId},
    fileLoc: {type: String, default: ""},
    onCampus: {type: Boolean},
    waiver: {type: Boolean},
    dateSubmitted: {type: Date, default: Date.now},
    dateApproved: {type: Date, default: ""},
    dateDenied: {type: Date, default: ""},
    dateLastModified: {type: Date, default: ""},
    notes: {type: String}

});

module.exports = mongoose.model('Project', projectSchema);