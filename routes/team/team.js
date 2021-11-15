var express = require('express');
const createTeam = require('./create');
const joinTeam = require('./join');
const getUserTeam = require('./userteams');
var router = express.Router();

/*
  Team === Project

  Team:[
    {
      team_id: 1,
      team_name: 'Team 1',
      team_description: 'Team 1 description',
      team_members: [
        {
          user_id: 1,
          user_name: 'User 1',
          is_admin: true
        },
      ],
      team_materials: [
        {
          material_id: 1,
          material_folder: "Some name",
          folder_content: [
            {
              content_id: 1,
              content_name: "Some name",
              content_url: "Some url",
            }
          ]
        }
      ],
      team_tasks: [
        {
          task_id: 1,
          task_name: "Some name",
          task_deadline: "Some deadline",
          isDone:true,
          sub_tasks: [
            {
              sub_task_id: 1,
              sub_task_name: "Some name",
              is_done: true,
            }
          ]
        }
      ]
    }
  ]
*/

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