const mongoose = require('mongoose');
const schema = mongoose.Schema;

var majorSchema = new schema({
    major: {type: String, unique: true},
    department: {type: String},
    college: {type: String}
});

module.exports =  mongoose.model('Major', majorSchema);