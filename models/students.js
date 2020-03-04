const mongoose = require('mongoose');
const schema = mongoose.Schema;

var studentsSchema = new schema({

    name: {type: String},
    stuID: {type: Number, unique: true},
    email: {type: String, unique: true},
    major: {type: mongoose.Types.ObjectId},
    classLevel: {type: String},
    primaryLocation: {type: String}

});

module.exports = mongoose.model('Students', studentsSchema);