var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
const User = require('../models/users');


/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find().then((data) => {

    console.log(data);
    res.json(data);

  })

});



module.exports = router;


/*



const newUser = new User({

  username: 'Kodzo',
  password : 'test',
  email: 'kodzo@kovalys.com'

})

newUser.save().then(() => {

  console.log('New User saved')

  User.find().then((data) => {

  console.log(data);
  
  }) 

}) 


*/