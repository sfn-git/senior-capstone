const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orspSchema = new schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    isAdmin: {type: Boolean, default: false}
});

module.exports =  mongoose.model('ORSP Staff', orspSchema);