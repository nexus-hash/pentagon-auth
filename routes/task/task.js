const express = require('express');
const createTask = require('./createtask');
const router = express.Router();

router.post('/new',function(req,res,next){
  createTask(req,res,next)
})

module.exports = router;