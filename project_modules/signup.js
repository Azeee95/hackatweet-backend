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

  let result = [];

  const email = userdata[0].email.trim();
  const password = userdata[0].password.trim();
  const hash = bcrypt.hashSync(password, 10)
  const token = uid2(32);
  const firstname = userdata[0].firstname.trim();
  const useruid = Math.floor(Math.random() * 90000) + 10000;

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
  function validateEmail(email) {
    return emailRegex.test(email);
  }
  
  const isValidEmail = validateEmail(email);
  
  if (!isValidEmail) {
  
    result.push(results[0]);
    return result;

  } else {

    const data = await User.findOne({email: {$regex: new RegExp(email, 'i')}});

    if (data !== null) {

      result.push(results[5])
      return result;

    } else {

      const newUser = new User({
  
        email : email,
        password: hash,
        token: token,
        firstname: firstname,
        useruid: useruid
        
      });
      
       const newitem = await newUser.save();

       if (newitem) {

        let userSignedIn = {firstname: newitem.firstname, email: newitem.email, token: newitem.token, useruid: newitem.useruid}

        result.push(results[6]);
        result.push(userSignedIn);
        return result;

       } else {

        result.push(results[7])
        return result;

       }

      }

    }
  }
    


  

