const mongoose = require('mongoose');
const schema = mongoose.Schema;

var majorSchema = new schema({

    "major": String,
    "college": String

});

var major = mongoose.model("Major", majorSchema);

module.exports = major;