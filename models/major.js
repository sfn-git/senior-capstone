const mongoose = require('mongoose');
const schema = mongoose.Schema;

var majorSchema = new schema({
    major: String,
    college: String
});

module.exports =  mongoose.model('Major', majorSchema);