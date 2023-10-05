var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');

// Authentication tools
const bcrypt = require('bcrypt');
const uid2 = require ('uid2');

const token = uid2(32);


// Import Project Modules

const results = require('./results')

// Function

module.exports = async function signin(credentials){

  let result = [];

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

const email = credentials[0].email.trim();
const password = credentials[0].password.trim();

const isValidEmail = validateEmail(email);

if (!isValidEmail) {

  result.push(results[0]) 
  return result;

} else {

 let data = await User.findOne({email: {$regex: new RegExp(email, 'i')}}) 
  
    if (data == null) {

      result.push(results[1]);
      return result;
      
      } else {

        if (!bcrypt.compareSync(password, data.password)) {

          result.push(results[2]);
          return result;

      } else {

        let userSignedIn = {firstname: data.firstname, email: data.email, token: data.token, useruid: data.useruid }

        result.push(results[3]);
        result.push(userSignedIn);
        
        return result;
    
        }

      }

  }

}