const express = require('express');
const AddNewFolder = require('./addfolder');
const AddUrl = require('./addmaterial');
const GetFolder = require('./getmaterials');
const deleteFolder = require('./removematerial');
const router = express.Router();

router.post('/newfolder',function(req,res,next){
  AddNewFolder(req,res,next);
})

router.post('/add',function(req,res,next){
  AddUrl(req,res,next);
})

router.post("/delete", function (req, res, next) {
  deleteFolder(req,res,next);
});

router.post("/", function (req, res, next) {
 GetFolder(req, res, next);
});

module.exports = router