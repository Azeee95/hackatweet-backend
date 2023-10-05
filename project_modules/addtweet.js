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

// Function

module.exports = async function addtweet(userdata) {

  let result = [];
  let hashtags = ['#test', '#test2'];

  const email = userdata[0].email.trim();
  const message = userdata[0].message.trim();
  const date = new Date();
  const likes = [];

  console.log(date);

  /*
  userdata.hashtags.map((item) => {

    hashtags.push(item);

  })

  */

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
  function validateEmail(email) {
    return emailRegex.test(email);
  }
  
  const isValidEmail = validateEmail(email);
  
  if (!isValidEmail) {
  
    result.push(results[0]);
    result.push(userdata);

    return result;

  } else {

    const data = await User.findOne({email: {$regex: new RegExp(email, 'i')}});

    if (data == null) {

      result.push(results[1])
      result.push(userdata);

      return result;

    } else {

      const creator = data.id;

      const newTweet = new Tweet({
  
        creator : creator,
        message: message,
        date: date,
        hashtags: hashtags,
        likes: likes,
        
      });
      
       const newitem = await newTweet.save().populate('users')

       if (newitem) {

        
        let tweetSaved = newitem;

        result.push(results[9]);
        result.push(tweetSaved);
        return result;

       } else {

        result.push(results[11])
        return result;

       }

      }

    }
  }
    


  

