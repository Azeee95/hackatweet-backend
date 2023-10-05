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


// Function

module.exports = async function findtweet(param){

let result = [];

// Si l'appel se fait sans paramètre email

if (param == null) {

const data = await Tweet.find().populate('creator');

if (data == null) {

    // Aucun tweet dans la base
    result.push(results[8]);

} else {

    // Récupération de l'ensemble des tweet de la base

    result.push(results[12]);

    // Ajout des tweets dans le tableau result sans les informations sensibles

    data.map((item) => {

    result.push({creator: item.creator.firstname, token: item.creator.token, useruid: item.creator.useruid, tweetuid: item.tweetuid, message: item.message, date: item.date, likes: item.likes, hashtags: item.hashtags});

    })

}

return result;

} else {

// Si un paramètre est renseigné pendant l'appel : le mail de l'utilisateur. Alors la recherche se fera avec l'email de l'utilisateur

let userEmail = param.userEmail;

// Vérification de l'existance de l'utilisateur dans la base

result = await checkuser(userEmail);

// L'utilisateur existe-t-il ?

if (result[0].id == '14') {

    const dataTweet = await Tweet.find().populate('creator');

    dataTweet.map((item) => {

        if (item.creator.email == userEmail) {

            // Ajout des tweets de l'utilisateur dans result

            result.push({creator: item.creator.firstname, token: item.creator.token, tweetuid: item.tweetuid, message: item.message, date: item.date, likes: item.likes, hashtags: item.hashtags});
        
        } 

    })

    if (!result[2]) {

        // Si aucun tweet n'a été trouvé pour l'utilisateur 

        result.push(results[10]);

    }


}

return result;

}



}

