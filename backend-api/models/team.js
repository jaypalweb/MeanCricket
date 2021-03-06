var mongoose = require('mongoose');

//Team Schema
var TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Team name']
    },
    image: {
        type: String
    },
    country: {
        type: String
    },
    desc: {
        type: String
    }
});

module.exports = mongoose.model("Team", TeamSchema);