var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const Tweet = require ('../models/tweets');

// Authentication tools
const uid2 = require ('uid2');
const bcrypt = require('bcrypt');

// Import Project Modules

const results = require('./results.json');
const getHashTags = require('./getHashTags');
const checkuser = require('./checkuser');

// Function

module.exports = async function addtweet(userdata) {

// Récupération des hashtags

const hashtags = await getHashTags(userdata[0].message);

// Initialisation des données du tweet à enregistrer

  const email = userdata[0].email.trim();
  const message = userdata[0].message.trim();
  const date = new Date();
  const likes = [];
  const tweetuid = Math.floor(Math.random() * 90000) + 10000;

  // Vérification de l'existence de l'utilisateur

  let result = await checkuser(email);

  if (result[0].id == '14') { 

    // Si l'utilisateur existe

    const datanew = await User.findOne({email: {$regex: new RegExp(email, 'i')}});

    const creator = datanew.id;

    const newTweet = new Tweet({
  
        creator : creator,
        message: message,
        date: date,
        hashtags: hashtags,
        likes: likes,
        tweetuid: tweetuid
        
      });
      
    const newitem = await newTweet.save();
    
    let populateitem = await newitem.populate('creator')
    
    if (populateitem) {

        let tweetSaved = {creator: populateitem.creator.firstname, token: populateitem.creator.token, tweetuid: populateitem.tweetuid, message: populateitem.message, date: populateitem.date, likes: populateitem.likes, hashtags: populateitem.hashtags}

        result.push(results[9]);
        result.push(tweetSaved);
        return result;

       } else {

        result.push(results[11])
        return result;

       }

  } else {

    // L'utilisateur n'existe pas

    result.push(result[0])
    return result;

  }

  }
    


  

