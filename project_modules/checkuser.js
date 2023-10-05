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

module.exports = async function checkuser(userEmail){

    const email = userEmail;
    let result = [];

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
    // Check du format de l'email avec le regex

    function validateEmail(email) {
      return emailRegex.test(email);
    }
    
    const isValidEmail = validateEmail(email);
    
    if (!isValidEmail) {
    
        // Format email invalide
    
      const user = {email: email};

      result.push(results[13]);
      result.push(user);

      return result;
  
    } else {
  
      // Format email valide. Vérification de l'existance de l'utilisateur dans la base

      const data = await User.findOne({email: {$regex: new RegExp(email, 'i')}});
  
      if (data == null) {
  
        // La recherche n'a renvoyé aucun résultat. L'utilisateur n'existe pas.
        const user = {email: email};

        result.push(results[15]);
        result.push(user);

        return result;
  
      } else {

        // La recherche a renvoyé un résultat. L'utilisateur existe.

        const user = {firstname : data.firstname, email: data.email, token: data.token, useruid: data.useruid}

        result.push(results[14]);
        result.push(user);

        return result;

      }

    }

}