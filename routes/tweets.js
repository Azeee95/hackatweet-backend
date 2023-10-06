var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
const User = require('../models/users');
const Tweet = require('../models/tweets')

// Import Project Modules

const results = require('../project_modules/results.json');
const addtweet = require('../project_modules/addtweet');
const findtweet = require('../project_modules/findtweet');
const liketweet = require('../project_modules/liketweet');
const deletetweet = require('../project_modules/deletetweet');
const findthashtag = require('../project_modules/findhashtag');
const findtweetuseruid = require('../project_modules/findtweetuseruid');

/* Récupérer l'ensemble des tweets dans la base */

router.get('/', async function(req, res, next) {

    const result = await findtweet();

    res.json(result);

});

// Récupérer les tweets d'un utilisateur à partir de son adresse mail

router.get('/:userEmail', async function(req, res, next) {

    const result = await findtweet(req.params);

    res.json(result);

});


// Récupérer les tweets d'un utilisateur à partir de son useruid

router.get('/1/:useruid', async function(req, res, next) {

  const result = await findtweetuseruid(req.params);

  res.json(result);

});


// Rechercher l'ensemble des tweets qui ont un hashtag précis

router.get('/2/:hashtag', async function(req, res, next) {

  const result = await findthashtag(req.params);

  res.json(result);

});

// Ajouter un nouveau tweet dans la base

router.post('/add', async (req, res) => {

    const datareceived = [{
    
      email : req.body.email,
      message: req.body.message,

    }]
    
    const result = await addtweet(datareceived);
    
    res.json(result);
    
    });

// Liker ou Disliker un tweet avec un uid précis

router.put('/like/:tweetuid', async (req, res) => {

    const tweetuid = req.params.tweetuid;
    const useruid = req.body.useruid;

    const result = await liketweet(tweetuid, useruid);

    res.json(result);
        
  });


// Supprimer un tweet à partir de son uid

router.delete('/:tweetuid', async (req, res) => {

  const tweetuid = req.params.tweetuid;
  
  const result = await deletetweet(tweetuid);
  
  res.json(result);
          
});

module.exports = router;