const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orspSchema = new schema({
    name: {type: String},
    email: {type: String, unique: true},
    isAdmin: {type: Boolean, default: false}
});

module.exports =  mongoose.model('ORSP Staff', orspSchema);