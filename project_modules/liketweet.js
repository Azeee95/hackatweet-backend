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

module.exports = async function liketweet(tweetuid, useruid){ 

    let result = [];

    // Vérification de l'existance de ce tweet dans la base

    const datasearch = await Tweet.findOne({tweetuid: +tweetuid}).populate('creator');

    if (datasearch == null) { 

        result.push(results[16]);
        result.push({tweetuid: tweetuid});

        return result;

    }  else {

    // Le tweet existe dans la base

    let tweetLikes = datasearch.likes;

    // Vérification de la présence de l'utilisateur dans le tableau des likes du tweet

    let isLiked = tweetLikes.includes(useruid);

    if (isLiked) {

        //Si l'utilisateur est dans la liste des likes, action : Supprimer l'utilisateur de la liste.
        
        isLiked = false;

        const updatedData = await Tweet.updateOne(
        { 'tweetuid' : tweetuid},
        {$pull:{"likes": useruid}})
  
        // Recherche du tweet pour renvoyer le document mis à jour avec le tableau des likes pour le calcul du nombre de likes
  
        const data = await Tweet.findOne({tweetuid: tweetuid}).populate('creator');
  
        // Tri des informations à aficher pour le retour au frontend sans les informations sensibles

        const tweetDisplay = {creator: data.creator.firstname, token: data.creator.token, useruid: data.creator.useruid, tweetuid: data.tweetuid, message: data.message, date: data.date, likes: data.likes, hashtags: data.hashtags, isLiked: isLiked}

        return tweetDisplay;

    } else {

        isLiked = true;

        // Si l'utilisateur n'est pas dans la liste, action : Ajouter l'utilisateur dans la liste des likes

         // Ajout de l'utilisateur dans le tableau des likes du tweet

    const updatedData = await Tweet.updateOne(
        { 'tweetuid' : tweetuid},
        {$push:{"likes": useruid}})
  
  // Recherche du tweet pour renvoyer le document mis à jour avec le tableau des likes pour le calcul du nombre de likes
  
      const data = await Tweet.findOne({tweetuid: tweetuid}).populate('creator');
  
  // Tri des informations à aficher pour le retour au frontend sans les informations sensibles
  
      const tweetDisplay = {creator: data.creator.firstname, token: data.creator.token, useruid: data.creator.useruid, tweetuid: data.tweetuid, message: data.message, date: data.date, likes: data.likes, hashtags: data.hashtags, isLiked: isLiked}
  
      return tweetDisplay;

    }
   
      
    }
 


}
