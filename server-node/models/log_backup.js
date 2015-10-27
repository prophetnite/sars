// ===========================================================
//        FILE: log_backup.js
//        USE: DB Model
// ===========================================================

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Log_Backup', new Schema({
    "deviceid": String,
    "epoch": String,
    "store_free": String,
    "time": String,
    "date": String,
    "ip": String,
    "mac": String,
    "host": String,
    "connection": String,
    "other": String,
    "owner": String
}));
