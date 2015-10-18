// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    name: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String, 
    admin: Boolean,
    token_perma: String,
    token_temp: String 
}));
