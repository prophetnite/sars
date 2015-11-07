// ===========================================================
//        FILE: log_track.js
//        USE: DB Model
// ===========================================================

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('log_track', new Schema({
    "mac": String,
    "Epoch": String,
    "gps": String,
    "wifi": String,
    "ip": String,
    "host": String,
    "user-agent": String,
    "accept": String,
    "accept-language": String,
    "accept-encoding": String,
    "connection": String,
    "username": String,
    "token_temp": String
}), 'log_track');
