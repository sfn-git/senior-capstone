const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orspSchema = new schema({
    name: {type: String, unique: true},
    email: {type: String}
});

module.exports =  mongoose.model('ORSP Staff', orspSchema);