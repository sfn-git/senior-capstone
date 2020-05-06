const mongoose = require('mongoose');
const schema = mongoose.Schema;

var studentsSchema = new schema({

    name: {type: String, required: true},
    stuID: {type: Number},
    email: {type: String, unique: true, required: true},
    major: {type: mongoose.Types.ObjectId},
    classLevel: {type: String},
    primaryLocation: {type: String}

});

module.exports = mongoose.model('Students', studentsSchema);