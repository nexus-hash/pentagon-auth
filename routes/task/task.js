const express = require('express');
const createTask = require('./createtask');
const DeleteTask = require('./deletetask');
const UpdateProgress = require('./updateprogress');
const router = express.Router();

router.post('/new',function(req,res,next){
  createTask(req,res,next)
})

router.post('/update',function(req,res,next){
  UpdateProgress(req,res,next);
})

router.post("/delete", function (req, res, next) {
  DeleteTask(req,res,next);
});

module.exports = router;