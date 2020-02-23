const mongoose = require("mongoose");
const schema = mongoose.Schema;

var facultySchema = new schema({

    facultyName: {type: String},
    email: {type: String, unique: true},
    position: {type: mongoose.Types.ObjectId},
    department: {type: mongoose.Types.ObjectId},
    college: {type: String},
    officeLocation: {type: String},
    officePhone: {type: Number}

});

module.exports = facultySchema;