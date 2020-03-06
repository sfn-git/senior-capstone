const mongoose = require('mongoose');
const schema = mongoose.Schema;


var projectSchema = new schema({
    // _ID get automatically generated
    presentationType: {type: String},
    title: {type: String, unique: true},
    abstract: {type: String},
    projectArea: {type: String},
    researchLocation: {type: String},
    researchFunding: {type: String},
    rdYear: {type: Number},
    submitter: {type: mongoose.Types.ObjectId},
    copis: [{type: mongoose.Types.ObjectId}],
    facultyAdvisor: [{_id: mongoose.Types.ObjectId}],
    fileLoc: {type: String},
    onCampus: {type: Boolean},
    waiver: {type: Boolean},
    dateSubmitted: {type:Date, default:Date.now},
    dateApproved: {type:Date},
    dateDenied: {type:Date},
    dateLastModified: {type: Date}

});

const project = mongoose.model('Project', projectSchema);
module.exports = ()=>{return project};