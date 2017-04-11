
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');
/* POST /todos */
router.post('/', function(req, res) {
  try {
    req.checkBody("title", "Enter the title please").notEmpty();
    req.checkBody("description", "Enter the description.").notEmpty();

    var errors = req.validationErrors();
       if (errors) {
   		    res.send(errors[0]);
   		return;
    } else{
    todo.create(req.body, function (err, todos) {
      try {
        if(!req.body.description && !req.body.title) throw err;
        res.send({"status":true,"message":"Success"});

      } catch (e) {
        res.send({"status":false,"message":"Fail"});

      }
    });
  }
  } catch (e) {
    res.send({"status":false,"message":"Fail"});
  }
  });

 module.exports = router;
