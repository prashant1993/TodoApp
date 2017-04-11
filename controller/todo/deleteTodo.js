
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');

/* DELETE /todos/:id */
router.delete('/:id', function(req, res) {
  try {
    var user_id = req.decoded;
    console.log(user_id);
    todo.find({_id:req.params.id,user_id:user_id}).remove(function (err, todos) {
      if (err) throw err;
      console.log(todos);
      if (todos.result.n===0) {
        res.send({"status":false,"message":"not deleted"});
      }else {
        res.send({"status":true,"message":"suucess deleted"});
      }
    });
  } catch (e) {
    res.send({"status":false,"message":"not deleted"});
  }
});
module.exports = router;
