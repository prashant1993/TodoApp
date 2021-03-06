/**
 * readTodo controller
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');

/* GET  list of todos. */
router.get('/', function(req, res) {
    todo.find({
        "user_id": req.decoded
    }, "title description reminder updated_at", function(err, todos) {
        if (err) return next(err);
        res.send(todos);

    });
});
// /* GET /todos/id */
// router.get('/:id', function(req, res) {
//     todo.findById(req.params.id, function(err, todos) {
//         if (err) return next(err);
//         res.send(todos);
//     });
// });

module.exports = router;
