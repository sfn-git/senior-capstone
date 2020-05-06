const mongoose = require('mongoose');
const schema = mongoose.Schema;


var projectSchema = new schema({
    // _ID get automatically generated
    presentationType: {type: String, required: true},
    title: {type: String, required: true},
    abstractSubmitted: {type: String, maxlength: 750, required: true},
    abstractApproved: {type: String, maxlength: 750},
    projectArea: {type: String, required: true},
    researchLocation: {type: String, required: true},
    researchFunding: {type: String, required: true},
    rdYear: {type: Number},
    submitter: {type: mongoose.Types.ObjectId, required: true},
    copis: [{type: mongoose.Types.ObjectId}],
    facultyAdvisor: {type: mongoose.Types.ObjectId, required: true},
    fileLoc: {type: String, default: ""},
    onCampus: {type: Boolean, required: true},
    waiver: {type: Boolean, required: true},
    dateSubmitted: {type: Date, default: Date.now, required: true},
    datePosterSubmitted: {type: Date, default: ""},
    dateApproved: {type: Date, default: ""},
    dateDenied: {type: Date, default: ""},
    dateLastModified: {type: Date, default: Date.now, required: true},
    status: {type: String, enum:["Pending ORSP", "Pending Faculty","Approved", "Denied", "Pending PPT", "Retracted"], default:"Pending ORSP", required: true},
    notes: {type: String}

});

module.exports = mongoose.model('Project', projectSchema);