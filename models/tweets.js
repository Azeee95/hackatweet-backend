const mongoose = require("mongoose")

const tweetSchema = mongoose.Schema({
    
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    message: String,
    hashtags: [String], 
    likes : [String],
    date: Date,

});

const Tweet = mongoose.model('tweets', tweetSchema); 

module.exports = Tweet;
