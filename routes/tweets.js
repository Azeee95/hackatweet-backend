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
  

    router.put('/like/:tweetuid', async (req, res) => {

        const tweetuid = req.params.tweetuid;
        const useruid = req.body.useruid;

        const data = await Tweet.findOne({tweetuid: tweetuid}).populate('creator');

        const updatedData = await Tweet.updateOne(
          { 'tweetuid' : tweetuid},
          {$push:{"likes": useruid}})

        const data2 = await Tweet.findOne({tweetuid: tweetuid}).populate('creator');

        const tweetDisplay = {creator: data2.creator.firstname, token: data2.creator.token, useruid: data2.creator.useruid, tweetuid: data2.tweetuid, message: data2.message, date: data2.date, likes: data2.likes, hashtags: data2.hashtags}
        
        res.json(tweetDisplay);
        
        });
      

module.exports = router;