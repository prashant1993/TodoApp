
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');
/* GET /todos listing. */
router.get('/', function(req, res) {
  todo.find({"user_id":req.decoded},"title description",function (err, todos) {
    if (err) return next(err);
    res.json(todos);

  });
});
//
// /* GET /todos/id */
router.get('/:id', function(req, res) {
  todo.findById(req.params.id, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});


// // /* GET /todos listing. */
// router.get('/', function(req, res, next) {
//   todo.find(function (err, todos) {
//     if (err) return next(err);
//     res.json(todos);
//   });
// });

module.exports = router;
