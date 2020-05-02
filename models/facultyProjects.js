const mongoose = require("mongoose");
const schema = mongoose.Schema;

var facultyProjectsSchema = new schema({

    title: {type: String},
    abstract: {type: String},
    description: {type: String},
    primaryInvestigator: {type: mongoose.Types.ObjectId},
    onCampus: {type: Boolean},
    coFacultyInvestigator: [{}],
    coStudentInvestigator: [{type: mongoose.Types.ObjectId}],
    consent: {type: Boolean},
    dateSubmitted: {type: Date, default: Date.now},
    status: {type: String, default: "Submitted"}

});

module.exports = mongoose.model('Faculty Projects', facultyProjectsSchema);