var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    owner: {type: String, required: true},
    email: {type: String, required: true},
    leaveDate: {type: String, required: true},
    profileImage: {type: String, required: true},
    status: {type: String, required: true},
    ownerId: {type: String, required: true}
});

module.exports = mongoose.model('Leave', schema);