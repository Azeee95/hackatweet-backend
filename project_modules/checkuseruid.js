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

module.exports = async function checkuseruid(useruid){

    let result = [];

      // Vérification de l'existance de l'utilisateur dans la base

      const data = await User.findOne({useruid: useruid});
  
      if (data == null) {
  
        // La recherche n'a renvoyé aucun résultat. L'utilisateur n'existe pas.
        const user = {useruid: useruid};

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
