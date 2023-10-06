var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const Tweet = require('../models/tweets');

// Authentication tools
const bcrypt = require('bcrypt');
const uid2 = require ('uid2');

// Import Project Modules

const results = require('./results');
const checkuser = require('./checkuser');
const checkuseruid = require('./checkuseruid');

// Function

module.exports = async function findhashtag(param){

let result = [];

let hashtag = param.hashtag;

// Recherche de ce hashtag dans les tweets

const dataTweet = await Tweet.find().populate('creator');

    dataTweet.map((item) => {

        if (item.hashtags.includes(hashtag.toLowerCase().trim())) {

            // Ajout des tweets du hashtag dans result

            result.push({creator: item.creator.firstname, token: item.creator.token, useruid: item.creator.useruid, tweetuid: item.tweetuid, message: item.message, date: item.date, likes: item.likes, hashtags: item.hashtags});
        
        } 

    }) 

    if (!result[1]) {

        // Si aucun tweet n'a été trouvé pour le hashtag 

      // result.push(results[8]);

    }

return result;

console.log(result);

}
