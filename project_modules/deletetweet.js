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

module.exports = async function deletetweet(tweetuid){ 

    let result = [];

    // Vérification de l'existance de ce tweet dans la base

    const datasearch = await Tweet.findOne({tweetuid: tweetuid}).populate('creator');

    if (datasearch == null) { 

        // Le tweet n'existe pas dans la base

        result.push(results[16]);
        result.push({tweetuid: tweetuid});

        return result;

    }  else {

    // Le tweet existe dans la base

    // Suppression du tweet

    const deletedtweet = await Tweet.deleteOne({ tweetuid: tweetuid });

    result.push(results[17]);
    result.push({tweetuid: tweetuid});

    return result;

    }
   
      
}
 



