var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
const User = require('../models/users');
const Tweet = require('../models/tweets')

// Import Project Modules

const results = require('../project_modules/results.json');
const addtweet = require('../project_modules/addtweet');
const findtweet = require('../project_modules/findtweet')

/* GET users listing. */

router.get('/', async function(req, res, next) {

    const result = await findtweet();

    res.json(result);

});

router.get('/:userEmail', async function(req, res, next) {

    const result = await findtweet(req.params);

    res.json(result);

});


router.post('/add', async (req, res) => {

    const datareceived = [{
    
      email : req.body.email,
      message: req.body.message,

    }]
    
    const result = await addtweet(datareceived);
    
    res.json(result);
    
    });
  

    

/*
router.post('/signin', async (req, res) => {

  const credentials = [{
  
    email : req.body.email,
    password: req.body.password,
  
  }]

  const result = await signin(credentials);

  res.json(result);
  
})

*/


module.exports = router;