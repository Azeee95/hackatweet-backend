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

/* GET users listing. */

router.get('/', function(req, res, next) {

  User.find().then((data) => {

    res.json(data);

  })

});

router.post('/signin', async (req, res) => {

  const credentials = [{
  
    email : req.body.email,
    password: req.body.password,
  
  }]

  const result = await signin(credentials);

  res.json(result);
  
})

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