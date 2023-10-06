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

module.exports = async function findtweetfilterhashtag(){

let result = [];
let hashtags = [];
let hashtagsObj = [];

const data = await Tweet.find().populate('creator');

data.map((item) => {

  //  result.push({creator: item.creator.firstname, token: item.creator.token, useruid: item.creator.useruid, tweetuid: item.tweetuid, message: item.message, date: item.date, likes: item.likes, hashtags: item.hashtags});

    item.hashtags.map((item2) => {

        hashtags.push(item2);
        hashtagsObj.push({name : item2, tweetuid: item.tweetuid});

    })

    })

    function removeDuplicates(arr) {

        let unique = [];
        arr.forEach(element => {
            
          if (!unique.includes(element)) {
                unique.push(element);
            }
        });
        return unique;
      }
      
    const hashtagsFilter = await removeDuplicates(hashtags);

    const Arr = hashtagsFilter;
    const ArrObj = hashtagsObj;

    // Créer un objet pour regrouper les tweetuid par name
    const groupedObj = {};

    // Parcourir le tableau ArrObj
    ArrObj.forEach(obj => {

        if (!groupedObj[obj.name]) {
        groupedObj[obj.name] = [];
        }

    groupedObj[obj.name].push(obj.tweetuid);

    });

    // Créer un nouveau tableau d'objets avec les regroupements
    const resultArr = [];

    // Parcourir les propriétés de groupedObj pour créer les nouveaux objets
    for (const name in groupedObj) {
    resultArr.push({ name, tweetuids: groupedObj[name] });
    }

    // Le résultat sera dans resultArr
    console.log(resultArr);

    return resultArr;

}






