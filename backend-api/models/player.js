var mongoose = require('mongoose');

//Player Schema
var PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Player name']
    },
    image: {
        type: String
    },
    team: {
        type: String
    },
    desc: {
        type: String
    }
});

module.exports = mongoose.model("Player", PlayerSchema);