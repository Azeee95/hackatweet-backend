const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    
    email: String,
    useruid: Number,
    firstname: String, 
    password: String,
    token: String

});

const User = mongoose.model('users', userSchema); 

module.exports = User;
