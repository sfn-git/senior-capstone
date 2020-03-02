const mongoose = require("mongoose");
const schema = mongoose.Schema;

var facultySchema = new schema({

    facultyName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    position: {type: String},
    department: {type: String},
    college: {type: String},
    officeLocation: {type: String},
    officePhone: {type: Number}

});

module.exports = mongoose.model('Faculty', facultySchema);