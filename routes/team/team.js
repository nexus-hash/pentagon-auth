var express = require('express');
const createTeam = require('./create');
const joinTeam = require('./join');
const getUserTeam = require('./userteams');
var router = express.Router();

router.post('/create',function (req,res,next){
  createTeam(req,res,next)
})

router.post('/join',function(req,res,next){
 joinTeam(req,res,next)
})

router.post('/getteams',function(req,res,next){
  getUserTeam(req,res,next)
})

module.exports = router;