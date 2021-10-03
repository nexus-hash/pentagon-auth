var express = require('express');
var router = express.Router();
var client = require("../database/db");
const sendEmail = require('../mailer/sendEmail');
var mailMessage = require('../mailer/mailFormat');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    
  }catch(err){
    console.log(err);
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
