var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');

// Authentication tools
const uid2 = require ('uid2');
const bcrypt = require('bcrypt');

// Import Project Modules

const results = require('./results.json');

// Function

module.exports = async function signup(userdata) {

  let result = results[4];

  const email = userdata[0].email.trim();
  const password = userdata[0].password.trim();
  const hash = bcrypt.hashSync(password, 10)
  const token = uid2(32);
  const firstname = userdata[0].firstname.trim();

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
  function validateEmail(email) {
    return emailRegex.test(email);
  }
  
  const isValidEmail = validateEmail(email);
  
  if (!isValidEmail) {
  
    result = results[0]
    return result;

  } else {

    const data = await User.findOne({email: {$regex: new RegExp(email, 'i')}});

    if (data !== null) {

      result = results[5]
      return result;

    } else {

      const newUser = new User({
  
        email : email,
        password: hash,
        token: token,
        firstname: firstname,
        
      });
      
       const newitem = await newUser.save();

       if (newitem) {

        result = results[6]
        return result;

       } else {

        result = results[7]
        return result;

       }

      }

    }
  }
    


  

