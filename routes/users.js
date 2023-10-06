var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
const User = require('../models/users');

// Authentication tools
const uid2 = require ('uid2');
const bcrypt = require('bcrypt');

// Import Project Modules

const results = require('../project_modules/results.json');
const signin = require('../project_modules/signin')
const signup = require('../project_modules/signup');

// ---


let inputText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets #containing Lorem Ipsum passages, #and more recently with desktop publishing software #like Aldus PageMaker including #versions of Lorem Ipsum."


//- 


/* Lister tous les utilisateurs de la base */

router.get('/', function(req, res, next) {

  let userDisplay = [];

  User.find().then((data) => {

    data.map((item) => {

      userDisplay.push({email: item.email, firstname: item.firstname, token: item.token, useruid: item.useruid })

    })

    res.json(userDisplay);

  })

});

// Connecter un utilisateur avec son adresse mail et son mot de passe 

router.post('/signin', async (req, res) => {

  const credentials = [{
  
    email : req.body.email,
    password: req.body.password,
  
  }]

  const result = await signin(credentials);

  res.json(result);
  
})

// Inscrire un nouvel utilisateur avec son email, son passeword et son firstname

router.post('/signup', async (req, res) => {

  const datareceived = [{
  
    email : req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,

  }]
  
  const result = await signup(datareceived);
  
  res.json(result);
  
  });


module.exports = router;