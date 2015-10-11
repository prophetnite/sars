
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Log_IP', new Schema({ 
    "time": String, 
    "date": String, 
    "ip": String,  
    "host": String,
    "user-agent": String,
    "accept": String,
    "accept-language": String,
    "accept-encoding": String,
    "connection": String,
    "other": String,
    "owner": String
}));


