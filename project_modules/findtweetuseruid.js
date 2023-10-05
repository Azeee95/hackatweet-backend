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

module.exports = async function findtweetuseruid(param){

let result = [];

let useruid = param.useruid;

// Vérification de l'existance de l'utilisateur dans la base

result = await checkuseruid(useruid);

// L'utilisateur existe-t-il ?

if (result[0].id == '14') {

    // Si l'utilisateur existe 

    const dataTweet = await Tweet.find().populate('creator');

    dataTweet.map((item) => {

        if (item.creator.useruid == useruid) {

            // Ajout des tweets de l'utilisateur dans result

            result.push({creator: item.creator.firstname, token: item.creator.token, useruid: useruid, tweetuid: item.tweetuid, message: item.message, date: item.date, likes: item.likes, hashtags: item.hashtags});
        
        } 

    })

    if (!result[2]) {

        // Si aucun tweet n'a été trouvé pour l'utilisateur 

        result.push(results[10]);

    }

}

return result;

}
